"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_fastify = __toESM(require("fastify"));

// src/routes/transactions.ts
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
async function transactionRoutes(app2) {
  app2.get("/", { preHandler: checkIfSessionIdExists }, async (req, rep) => {
    const { sessionId } = req.cookies;
    const transactions = await knex("transactions").where("session_id", sessionId).select("*");
    return rep.status(200).send({
      transactions
    });
  });
  app2.get("/:id", { preHandler: checkIfSessionIdExists }, async (req, rep) => {
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
  app2.get("/totalAmount", { preHandler: checkIfSessionIdExists }, async (req, rep) => {
    const { sessionId } = req.cookies;
    const totalAmount = await knex("transactions").where("session_id", sessionId).sum("amount", {
      as: "totalAmount"
    }).first();
    return rep.status(200).send({
      totalAmount
    });
  });
  app2.post("/", async (req, rep) => {
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
  app2.delete("/:id", async (req, rep) => {
    if (!req)
      return rep.status(400).send("No request found!");
    const id = paramsZType(req);
    if (!id)
      return rep.status(404).send(`Resource not found! ID: ${id}`);
    await knex("transactions").where("id", id).delete();
    return rep.status(200).send(`Transaction deleted! ID: ${id}`);
  });
}

// src/routes/users.ts
var import_node_crypto2 = require("crypto");

// src/types/user/requestUserBodyType.ts
var import_zod4 = require("zod");
function userBodyZType(req) {
  const createZUserBodyTypeSchema = import_zod4.z.object({
    id: import_zod4.z.string().uuid(),
    name: import_zod4.z.string(),
    email: import_zod4.z.string().email({ message: "Invalid e-mail address" })
  });
  const user = createZUserBodyTypeSchema.parse(req.body);
  return user;
}

// src/routes/users.ts
async function userRoutes(app2) {
  app2.get("/", async (req, rep) => {
    const users = knex("users").select("*");
    return rep.status(200).send(users);
  });
  app2.get("/:id", async (req, rep) => {
    const id = paramsZType(req);
    const user = knex("users").where("id", id).first();
    if (user === void 0)
      return rep.status(404).send(`Resource not found! ID: ${id}`);
    return rep.status(200).send({
      user
    });
  });
  app2.post("/", async (req, rep) => {
    const { name, email } = userBodyZType(req);
    const existUser = await knex("users").where("email", email).first();
    if (existUser !== void 0) {
      return rep.status(200).send(`Email already exists! E-mail: ${email}`);
    }
    const user = await knex("users").insert({
      id: (0, import_node_crypto2.randomUUID)(),
      name,
      email
    }).returning("*");
    return rep.status(201).send(user);
  });
}

// src/app.ts
var import_cookie = __toESM(require("@fastify/cookie"));
var app = (0, import_fastify.default)();
app.register(import_cookie.default);
app.register(transactionRoutes, {
  prefix: "transactions"
});
app.register(userRoutes, {
  prefix: "users"
});

// src/server.ts
app.listen({
  port: env.PORT
}).then(() => {
  console.log("Server running on port 3333");
});
