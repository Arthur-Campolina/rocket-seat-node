import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { knex } from "../database.js";
import { userBodyZType } from "../types/user/requestUserBodyType.js";
import { paramsZType } from "../types/requestParamsType.js";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", async (_req, rep) => {
    const users = await knex("users").select("*");

    return rep.status(200).send({
      result: users,
      quantity: users.length,
    });
  });

  app.get("/:id", async (req, rep) => {
    const id = paramsZType(req);

    const user = await knex("users").where("id", id).first();

    if (!user) return rep.status(404).send(`Resource not found! ID: ${id}`);

    return rep.status(200).send({
      user,
    });
  });

  app.post("/", async (req, rep) => {
    const { name, email } = userBodyZType(req);

    const existUser = await knex("users").where("email", email).first();

    if (existUser)
      return rep.status(200).send(`Email already exists! E-mail: ${email}`);

    const user = await knex("users")
      .insert({
        id: randomUUID(),
        name,
        email,
      })
      .returning("*");
    return rep.status(201).send(user);
  });
}
