import { FastifyRequest } from "fastify";
import { z } from 'zod'
export function requestBodyMeal(req: FastifyRequest) {
    const createZRequestBodySchema = z.object({
        id: z.string(),
        name: z.string(),
        caloriesQuantity: z.number(),
        carbsQuantity: z.number(),
        proteinQuantity: z.number(),
        fatQuantity: z.number(),
        trafficLight: z.enum(['green', 'orange', 'red']),
        created_at: z.date(),
        updated_at: z.date(),
    })
    const body = createZRequestBodySchema.parse(req.body)
    return body
}