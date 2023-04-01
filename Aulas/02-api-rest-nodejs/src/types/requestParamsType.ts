import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export function paramsZType(req: FastifyRequest) {
    const createZParamsSchema = z.object({
        id: z.string().uuid(),
    })
    const { id } = createZParamsSchema.parse(req.params)
    return id
}