import { makeGetNumberCheckInsService } from "@/services/factories/make-getNumberCheckInsService";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getNumberCheckInsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.user.sub;
  const getNumberCheckInsService = makeGetNumberCheckInsService();
  const numberCheckIns = await getNumberCheckInsService.execute(userId);

  return reply.status(200).send({ numberCheckIns });
}
