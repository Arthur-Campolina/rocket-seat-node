import { FastifyRequest } from "fastify";
import { z } from 'zod'
export function requestBodyUser(req: FastifyRequest) {
    const createZRequestBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        type: z.enum(['admin', 'user']).default('user'),
    })
    const body = createZRequestBodySchema.parse(req.body)
    return body
}