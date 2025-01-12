import { makeGetUserProfileService } from "@/services/factories/make-getUserProfileService";
import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserProfile = makeGetUserProfileService();

  const { user } = await getUserProfile.execute({
    id: request.user.sub,
  });

  return reply.status(StatusCodes.OK).send({
    user: {
      ...user,
      password: undefined,
    },
  });
}
