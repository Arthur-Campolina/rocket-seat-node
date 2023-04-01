import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export function bodyZType(req: FastifyRequest) {
    const createZTransactionBodySchema = z.object({
        title: z.string(),
        amount: z.number(),
        type: z.enum(['debit', 'credit']),
    })
    const body = createZTransactionBodySchema.parse(req.body)
    return body
}