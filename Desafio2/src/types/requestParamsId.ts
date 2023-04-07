import { FastifyRequest } from "fastify";
import { z } from "zod";

export function requestParamsId(request: FastifyRequest) {
    const createZRequestParamsIdSchema = z.object({
        id: z.string().uuid(),
    })
    const { id } = createZRequestParamsIdSchema.parse(request.params)
    return id
}