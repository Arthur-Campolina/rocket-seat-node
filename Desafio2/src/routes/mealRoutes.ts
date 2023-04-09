import { FastifyInstance } from 'fastify'
import { requestBodyMeal } from '../types/requestBodyMeal'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { isAdmin } from '../middlewares/isAdmin'
import { requestParamsId } from '../types/requestParamsId'

export async function mealRoutes(app: FastifyInstance) {

    app.get('/all/:id', { preHandler: isAdmin }, async (request, reply) => {
        const meals = await knex('meals')
            .select('*')

        return reply.status(200).send({
            meals,
        })
    })

    app.get('/', async (request, reply) => {
        const sessionId = request.cookies.sessionId
        if (sessionId === undefined) return reply.status(400).send('User not identified!')

        const user = await knex('users')
            .where({
                session_id: sessionId,
            })
            .first()
        if (user === undefined) return reply.status(400).send('User not found!')

        // [] retornando vazio => corrigir
        const userId = user.id
        const meals = await knex.select('meals.*')
            .from('meals')
            .leftJoin('userMeals', function () {
                this.on('meals.id', '=', 'userMeals.mealId')
            })
            .where('userMeals.userId', userId)
            .returning('*')

        return reply.status(200).send(meals)
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
                mealId: mealId,
                userId: userId,
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

    app.delete('/:id', async (request, reply) => {
        if (!request.params) return reply.status(400).send('Request params not found!')
        const mealId = requestParamsId(request)
        const sessionId = request.cookies.sessionId
        if (sessionId === undefined) return reply.status(400).send('User not identified!')

        const user = await knex('users')
            .where({
                session_id: sessionId,
            })
            .first()
        if (user === undefined) return reply.status(400).send('User not found!')
        const meal = await knex('meals')
            .where('id', mealId)
            .first()
        if (meal === undefined) return reply.status(400).send(`Meal not found! ID: ${mealId}`)

        await knex('meals')
            .where('id', mealId)
            .delete()
        await knex('userMeals')
            .where('mealId', mealId)
            .delete()

        return reply.status(200).send()
    })
}