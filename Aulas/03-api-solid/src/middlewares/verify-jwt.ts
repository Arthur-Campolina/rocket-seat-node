import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (error: any) {
    return reply.status(StatusCodes.UNAUTHORIZED).send({ message: "Unauthorized!" });
  }
}
