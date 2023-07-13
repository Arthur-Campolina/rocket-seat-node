import { makeValidateCheckInsService } from "@/services/factories/make-validateCheckInService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validateCheckInController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const requestParamsSchema = z.object({
    checkInId: z.string(),
  });
  const { checkInId } = requestParamsSchema.parse(request.params);
  const validateCheckInService = makeValidateCheckInsService();

  try {
    await validateCheckInService.execute({ checkInId });
    return reply.status(204).send();
  } catch (error: any) {
    return reply.status(400).send(error);
  }
}
