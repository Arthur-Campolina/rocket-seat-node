import { FastifyInstance } from 'fastify'
import { requestBodyMeal } from '../types/requestBodyMeal'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { isAdmin } from '../middlewares/isAdmin'

export async function mealRoutes(app: FastifyInstance) {

    app.get('/', async (request, reply) => {
        const meals = await knex('meals')
            .select('*')

        return reply.status(200).send({
            meals,
        })
    })

    app.get('/all', { preHandler: isAdmin }, async (request, reply) => {
        const meals = await knex('meals')
            .select('*')

        return reply.status(200).send({
            meals,
        })
    })

    app.post('/', async (request, reply) => {
        if (!request.body) return reply.status(400).send('Request body not found!')
        const sessionId = request.cookies.sessionId
        if (sessionId === undefined) return reply.status(400).send('User not identified!')
        const body = requestBodyMeal(request)
        if (!body) return reply.status(400).send('')

        const user = await knex('users')
            .where('session_id', sessionId)
            .first()
        if (user === undefined) return reply.status(400).send('User not found!')
        const userId = user.id

        const meal = await knex('meals')
            .insert({
                id: randomUUID(),
                name: body.name.toUpperCase(),
                caloriesQuantity: body.caloriesQuantity,
                carbsQuantity: body.carbsQuantity,
                proteinQuantity: body.proteinQuantity,
                fatQuantity: body.fatQuantity,
                trafficLight: body.trafficLight,
            })
            .returning('*')
        const mealObject = meal.shift()
        if (mealObject === undefined) return reply.status(400).send('Meal not found!')
        const mealId = mealObject.id

        await knex('userMeals')
            .insert({
                id: randomUUID(),
                mealId: userId,
                userId: mealId,
            })

        return reply.status(201).send({
            mealObject,
        })
    })

    // app.put('/', (request, reply) => {
    //     console.log('PUT USERS!')
    //     return reply.status(200).send('PUT USERS!')
    // })

    // app.patch('/', (request, reply) => {
    //     console.log('PATCH USERS!')
    //     return reply.status(200).send('PATCH USERS!')
    // })

    // app.delete('/', (request, reply) => {
    //     console.log('DELETE USERS!')
    //     return reply.status(200).send('DELETE USERS!')
    // })
}