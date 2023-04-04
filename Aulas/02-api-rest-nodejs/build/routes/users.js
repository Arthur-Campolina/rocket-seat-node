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

// src/routes/users.ts
var users_exports = {};
__export(users_exports, {
  userRoutes: () => userRoutes
});
module.exports = __toCommonJS(users_exports);
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

// src/types/user/requestUserBodyType.ts
var import_zod2 = require("zod");
function userBodyZType(req) {
  const createZUserBodyTypeSchema = import_zod2.z.object({
    id: import_zod2.z.string().uuid(),
    name: import_zod2.z.string(),
    email: import_zod2.z.string().email({ message: "Invalid e-mail address" })
  });
  const user = createZUserBodyTypeSchema.parse(req.body);
  return user;
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

// src/routes/users.ts
async function userRoutes(app) {
  app.get("/", async (req, rep) => {
    const users = knex("users").select("*");
    return rep.status(200).send(users);
  });
  app.get("/:id", async (req, rep) => {
    const id = paramsZType(req);
    const user = knex("users").where("id", id).first();
    if (user === void 0)
      return rep.status(404).send(`Resource not found! ID: ${id}`);
    return rep.status(200).send({
      user
    });
  });
  app.post("/", async (req, rep) => {
    const { name, email } = userBodyZType(req);
    const existUser = await knex("users").where("email", email).first();
    if (existUser !== void 0) {
      return rep.status(200).send(`Email already exists! E-mail: ${email}`);
    }
    const user = await knex("users").insert({
      id: (0, import_node_crypto.randomUUID)(),
      name,
      email
    }).returning("*");
    return rep.status(201).send(user);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRoutes
});
