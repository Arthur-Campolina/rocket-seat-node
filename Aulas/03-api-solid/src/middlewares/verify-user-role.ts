import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

export const verifyUserRole = (role: 'ADMIN' | 'MEMBER') => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.user.role !== role) {
      return reply.status(StatusCodes.UNAUTHORIZED).send({ message: "Unauthorized" });
    }
  }
}