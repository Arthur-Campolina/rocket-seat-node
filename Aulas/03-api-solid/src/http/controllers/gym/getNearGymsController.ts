import { makeGetNearGymsService } from "@/services/factories/make-getNearGymsService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getNearGymsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const nearGymsQuerySchema = z.object({
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
  });
  const { userLatitude, userLongitude } = nearGymsQuerySchema.parse(
    request.query
  );

  const getNearGymsService = makeGetNearGymsService();
  const { gyms } = await getNearGymsService.execute({
    userLatitude,
    userLongitude,
  });
  return reply.status(200).send({ gyms });
}
