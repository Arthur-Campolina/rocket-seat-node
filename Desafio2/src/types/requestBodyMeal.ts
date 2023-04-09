import { FastifyRequest } from "fastify";
import { z } from 'zod'
export function requestBodyMeal(req: FastifyRequest) {
    const createZRequestBodySchema = z.object({
        name: z.string(),
        caloriesQuantity: z.number(),
        carbsQuantity: z.number(),
        proteinQuantity: z.number(),
        fatQuantity: z.number(),
        trafficLight: z.enum(['green', 'orange', 'red']).default('red'),
    })
    const body = createZRequestBodySchema.parse(req.body)
    return body
}