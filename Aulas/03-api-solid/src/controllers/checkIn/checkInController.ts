import { makeCheckInService } from "@/services/factories/make-checkInService";
import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export async function checkInController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const requestParamsSchema = z.object({
    gymId: z.string().uuid(),
  });
  const requestBodySchema = z.object({
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
  });
  const { userLatitude, userLongitude } = requestBodySchema.parse(request.body);
  const { gymId } = requestParamsSchema.parse(request.params);

  const checkInService = makeCheckInService();
  try {
    const { checkIn } = await checkInService.execute({
      userId: request.user.sub,
      gymId,
      userLatitude,
      userLongitude,
    });
    
    return reply.status(StatusCodes.CREATED).send({ checkIn });
  } catch (error) {
    return reply.status(StatusCodes.BAD_REQUEST).send(error);
  }
}
