import { makeGetNumberCheckInsService } from "@/services/factories/make-getNumberCheckInsService";
import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

export async function getNumberCheckInsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.user.sub;
  const getNumberCheckInsService = makeGetNumberCheckInsService();
  const numberCheckIns = await getNumberCheckInsService.execute(userId);

  return reply.status(StatusCodes.OK).send({ numberCheckIns });
}
