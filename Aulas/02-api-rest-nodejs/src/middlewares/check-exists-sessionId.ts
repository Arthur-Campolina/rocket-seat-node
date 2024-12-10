import { FastifyReply, FastifyRequest } from "fastify";

export async function checkIfSessionIdExists(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const cookies = req.cookies;

  if (!cookies?.sessionId) reply.status(401).send({ error: "Unauthorized!" });
}
