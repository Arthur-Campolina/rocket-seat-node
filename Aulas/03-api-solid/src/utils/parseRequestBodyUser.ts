import { FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import { z } from "zod";

export async function parseRequestBodyUser(request: FastifyRequest) {
  const requestBody = request.body;
  if (!requestBody) throw new Error("No request body found!");
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string().default(""),
    age: z.number().int().default(18),
    password: z.string().min(8),
  });

  const body = requestBodySchema.parse(requestBody);
  const password = await hash(body.password, 6);
  body.password = password;
  return body;
}
