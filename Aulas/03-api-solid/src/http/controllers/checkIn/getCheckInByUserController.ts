import { makeGetCheckInsByUserService } from "@/services/factories/make-getCheckInsByUserService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getCheckInByUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const requestQuerySchema = z.object({
    page: z.number().min(1).default(1),
  });
  const { page } = requestQuerySchema.parse(request.query);

  const getCheckInByUserService = makeGetCheckInsByUserService();
  const { checkIns } = await getCheckInByUserService.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({ checkIns });
}
