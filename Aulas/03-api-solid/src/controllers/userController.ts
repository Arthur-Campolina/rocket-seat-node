import { FastifyInstance } from "fastify";
import { prisma } from "@/lib/prisma";
// import { parseRequestParam } from "../utils/parseRequestParam";
import { registerUser } from "@/services/userService";

export async function userController(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const users = await prisma.user.findMany();
    return reply.status(200).send({
      users,
    });
  });

  // app.get("/:id", async (request, reply) => {
  //   const id = await parseRequestParam(request, reply);
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  //   return reply.status(200).send({ user });
  // });

  app.post("/", async (request, reply) => {
    try {
      const user = await registerUser(request);
      return reply.status(201).send({ user });
    } catch (error: any) {
      return reply.status(409).send(`Error: ${error}`);
    }
  });

  // app.put("/:id", async (request, reply) => {
  //   const id = await parseRequestParam(request, reply);
  //   const body = await parseRequestBodyUser(request);
  //   return reply.status(201).send({
  //     user,
  //   });
  // });

  // app.delete("/:id", async (request, reply) => {
  //   const id = await parseRequestParam(request, reply);
  //   await prisma.user.delete({
  //     where: {
  //       id,
  //     },
  //   });
  //   return reply.status(200).send();
  // });
}
