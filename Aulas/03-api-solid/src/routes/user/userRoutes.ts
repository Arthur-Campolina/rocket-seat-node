import { FastifyInstance } from "fastify";
import { parseRequestBodyUser } from "./utils/parseRequestBodyUser";

import { prisma } from "@/lib/prisma";
import { parseRequestParam } from "../parseRequestParam";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const users = await prisma.user.findMany();
    return reply.status(200).send({
      users,
    });
  });

  app.get("/:id", async (request, reply) => {
    const id = await parseRequestParam(request, reply);
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return reply.status(200).send({
      user,
    });
  });

  app.post("/", async (request, reply) => {
    const { name, email, password } = await parseRequestBodyUser(
      request,
      reply
    );
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return reply.status(201).send({
      user,
    });
  });

  app.put("/:id", async (request, reply) => {
    const id = await parseRequestParam(request, reply);
    const body = await parseRequestBodyUser(request, reply);
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        email: body.email,
        cpf: body.cpf,
        age: body.age,
        password: body.password,
      },
    });
    return reply.status(201).send({
      user,
    });
  });

  app.delete("/:id", async (request, reply) => {
    const id = await parseRequestParam(request, reply);
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return reply.status(200).send();
  });
}
