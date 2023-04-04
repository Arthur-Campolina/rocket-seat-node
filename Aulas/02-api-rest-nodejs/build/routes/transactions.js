"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/transactions.ts
var transactions_exports = {};
__export(transactions_exports, {
  transactionRoutes: () => transactionRoutes
});
module.exports = __toCommonJS(transactions_exports);
var import_node_crypto = require("crypto");

// src/database.ts
var import_knex = require("knex");

// src/env/index.ts
var import_dotenv = require("dotenv");
var import_zod = require("zod");
if (process.env.NODE_ENV === "test") {
  (0, import_dotenv.config)({ path: ".env.test" });
} else {
  (0, import_dotenv.config)();
}
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "test", "production"]).default("production"),
  DATABASE_URL: import_zod.z.string(),
  PORT: import_zod.z.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/database.ts
var config2 = {
  client: "sqlite",
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations"
  }
};
var knex = (0, import_knex.knex)(config2);

// src/types/transaction/requestTransactionBodyType.ts
var import_zod2 = require("zod");
function transactionBodyZType(req) {
  const createZTransactionBodySchema = import_zod2.z.object({
    title: import_zod2.z.string(),
    amount: import_zod2.z.number(),
    type: import_zod2.z.enum(["debit", "credit"])
  });
  const body = createZTransactionBodySchema.parse(req.body);
  return body;
}

// src/types/requestParamsType.ts
var import_zod3 = require("zod");
function paramsZType(req) {
  const createZParamsSchema = import_zod3.z.object({
    id: import_zod3.z.string().uuid()
  });
  const { id } = createZParamsSchema.parse(req.params);
  return id;
}

// src/middlewares/check-exists-sessionId.ts
async function checkIfSessionIdExists(req, reply) {
  const { sessionId } = req.cookies;
  if (!sessionId)
    reply.status(401).send({ error: "Unauthorized!" });
}

// src/routes/transactions.ts
async function transactionRoutes(app) {
  app.get("/", { preHandler: checkIfSessionIdExists }, async (req, rep) => {
    const { sessionId } = req.cookies;
    const transactions = await knex("transactions").where("session_id", sessionId).select("*");
    return rep.status(200).send({
      transactions
    });
  });
  app.get("/:id", { preHandler: checkIfSessionIdExists }, async (req, rep) => {
    if (!req)
      return rep.status(400).send("No request found!");
    const { sessionId } = req.cookies;
    const id = paramsZType(req);
    const transaction = await knex("transactions").where({
      id,
      "session_id": sessionId
    }).first();
    if (transaction === void 0)
      return rep.status(404).send(`Resource not found! ID: ${id}`);
    return rep.status(200).send({
      transaction
    });
  });
  app.get("/totalAmount", { preHandler: checkIfSessionIdExists }, async (req, rep) => {
    const { sessionId } = req.cookies;
    const totalAmount = await knex("transactions").where("session_id", sessionId).sum("amount", {
      as: "totalAmount"
    }).first();
    return rep.status(200).send({
      totalAmount
    });
  });
  app.post("/", async (req, rep) => {
    if (!req)
      return rep.status(400).send("No request found!");
    const body = transactionBodyZType(req);
    if (!body)
      console.error("No body found!");
    let sessionId = req.cookies.sessionId;
    if (!sessionId) {
      sessionId = (0, import_node_crypto.randomUUID)();
      rep.cookie("sessionId", sessionId, {
        maxAge: 1e3 * 60 * 60 * 24 * 7
        // 7 days
      });
    }
    await knex("transactions").insert({
      id: (0, import_node_crypto.randomUUID)(),
      title: body.title,
      amount: body.type === "credit" ? body.amount : body.amount * -1,
      session_id: sessionId
    });
    return rep.status(201).send("Transaction Created!");
  });
  app.delete("/:id", async (req, rep) => {
    if (!req)
      return rep.status(400).send("No request found!");
    const id = paramsZType(req);
    if (!id)
      return rep.status(404).send(`Resource not found! ID: ${id}`);
    await knex("transactions").where("id", id).delete();
    return rep.status(200).send(`Transaction deleted! ID: ${id}`);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  transactionRoutes
});
