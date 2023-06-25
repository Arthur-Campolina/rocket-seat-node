import { makeGetUserProfileService } from "@/services/factories/make-getUserProfileService";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserProfile = makeGetUserProfileService();
  const { user } = await getUserProfile.execute({
    id: request.user.sub,
  });
  return reply.status(200).send({
    user: {
      ...user,
      password: undefined,
    },
  });
}
