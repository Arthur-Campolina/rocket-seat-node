import { FastifyInstance } from "fastify";
import { UserService } from "@/services/userService";
import { PrismaUserRepository } from "@/repositories/prisma/userRepository";
import { parseRequestBodyUser } from "@/utils/parseRequestBodyUser";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";

export async function userController(app: FastifyInstance) {
  const userRepository = new PrismaUserRepository();
  const userService = new UserService(userRepository);
  app.post("/", async (request, reply) => {
    const requestBody = request.body;
    if (!requestBody) throw new Error("No request body found!");
    try {
      const body = await parseRequestBodyUser(request);
      const user = await userService.execute(body);
      return reply.status(201).send({ user });
    } catch (error: any) {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ Message: error.message });
      }
      return reply.status(500).send();
    }
  });
}
