import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function parseRequestParam(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.params)
    return reply.status(404).send("Request params not found!");
  const requestParamSchema = z.object({
    id: z.string(),
  });
  const { id } = requestParamSchema.parse(request.params);
  return id;
}
