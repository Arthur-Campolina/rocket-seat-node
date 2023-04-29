import { FastifyRequest } from "fastify";
import { z } from "zod";

export async function parseRequestBodyUser(request: FastifyRequest) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string().default(""),
    age: z.number().int().default(18),
    password: z.string().min(8),
  });
  const body = requestBodySchema.parse(request.body);
  return body;
}
