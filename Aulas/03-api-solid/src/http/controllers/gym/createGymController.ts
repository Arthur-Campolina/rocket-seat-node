import { makeCreateGymService } from "@/services/factories/make-createGymService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createGymController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const gymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
  });
  const { title, description, phone, longitude, latitude } =
    gymBodySchema.parse(request.body);

  const createGymService = makeCreateGymService();
  const { gym } = await createGymService.execute({
    title,
    description,
    phone,
    longitude,
    latitude,
  });

  return reply.status(201).send({ gym });
}
