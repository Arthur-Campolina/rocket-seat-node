import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function parseRequestBodyUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const requestBody = request.body;
  if (!requestBody) return reply.status(404).send("No request body found!");
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string().default(""),
    age: z.number().int().default(18),
    password: z.string(),
  });

  const body = requestBodySchema.parse(requestBody);
  return body;
}
