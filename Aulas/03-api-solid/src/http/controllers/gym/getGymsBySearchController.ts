import { makeGetGymsBySearchService } from "@/services/factories/make-GymsBySearchService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getGymsBySearchController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchGymSchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });
  const { query, page } = searchGymSchema.parse(request.query);

  const getGymBySearchService = makeGetGymsBySearchService();
  const { gyms } = await getGymBySearchService.execute({
    query,
    page,
  });

  return reply.status(200).send({ gyms });
}
