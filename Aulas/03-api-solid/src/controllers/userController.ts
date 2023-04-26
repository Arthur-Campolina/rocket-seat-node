import { FastifyInstance } from "fastify";
// import { parseRequestParam } from "../utils/parseRequestParam";
import { UserService } from "@/services/userService";
import { PrismaUserRepository } from "@/repositories/prisma/userRepository";
import { UserAlreadyExistsError } from "@/services/error/user-already-exists-error";

export async function userController(app: FastifyInstance) {
  const userRepository = new PrismaUserRepository();
  const userService = new UserService(userRepository);
  // app.get("/", async (request, reply) => {
  //   const users = await prisma.user.findMany();
  //   return reply.status(200).send({
  //     users,
  //   });
  // });

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
      const user = await userService.execute(request);
      return reply.status(201).send({ user });
    } catch (error: any) {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ Message: error.message });
      }
      return reply.status(500).send();
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
