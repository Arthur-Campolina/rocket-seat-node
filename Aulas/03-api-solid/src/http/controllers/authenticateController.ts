import { FastifyInstance } from "fastify";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { z } from "zod";
import { makeAuthenticateService } from "@/services/factories/make-authenticateService";

export async function authenticateController(app: FastifyInstance) {
  const userService = makeAuthenticateService();

  app.post("/", async (request, reply) => {
    const requestBody = request.body;
    if (!requestBody) throw new Error("No request body found!");

    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    });
    const { email, password } = authenticateBodySchema.parse(requestBody);

    try {
      await userService.execute({ email, password });
    } catch (error: any) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(400).send({ Message: error.message });
      }
      return reply.status(500).send();
    }
    return reply.status(200).send();
  });
}
