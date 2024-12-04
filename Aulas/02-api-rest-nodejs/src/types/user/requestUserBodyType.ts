import { FastifyRequest } from "fastify";
import { z } from "zod";

export function userBodyZType(req: FastifyRequest) {
  const createZUserBodyTypeSchema = z.object({
    name: z.string(),
    email: z.string().email({ message: "Invalid e-mail address" }),
  });

  const user = createZUserBodyTypeSchema.parse(req.body);

  return user;
}
