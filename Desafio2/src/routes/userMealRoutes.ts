import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { requestParamsId } from '../types/requestParamsId'
import { isThereSessionId } from '../middlewares/isThereSessionId'

export async function userMealRoutes(app: FastifyInstance) {

    app.get('/', async (request, reply) => {
        const userMeals = await knex('userMeals')
            .select('*')
        return reply.status(200).send({
            userMeals,
        })
    })

    app.get('/mealsQuantity/:id', { preHandler: isThereSessionId }, async (request, reply) => {
        if (!request.params) return reply.status(400).send('No request params found!')
        const id = requestParamsId(request)
        const sessionId = request.cookies.sessionId
        const user = await knex('users')
            .where({
                id: id,
                session_id: sessionId,
            })
            .first()
        if (user === undefined) return reply.status(400).send(`User not found! ID: ${id}`)

        const mealsQuantity = await knex('meals')
            .count('meals.id as quantity')
            .leftJoin('userMeals', function () {
                this.on('meals.id', '=', 'userMeals.mealId')
            })
            .where({
                userId: user.id,
            })

        return reply.status(200).send({
            mealsQuantity,
        })
    })

    app.get('/greenMealsQuantity/:id', async (request, reply) => {
        if (!request.params) return reply.status(400).send('No request params found!')
        const id = requestParamsId(request)
        const sessionId = request.cookies.sessionId
        const user = await knex('users')
            .where({
                id: id,
                session_id: sessionId,
            })
            .first()
        if (user === undefined) return reply.status(400).send(`User not found! ID: ${id}`)

        const greenMealsQuantity = await knex('meals')
            .count('meals.id as quantity')
            .leftJoin('userMeals', function () {
                this.on('meals.id', '=', 'userMeals.mealId')
            })
            .where({
                userId: user.id,
                trafficLight: "green",
            })

        return reply.status(200).send({
            greenMealsQuantity,
        })
    })

    app.get('/redMealsQuantity/:id', async (request, reply) => {
        if (!request.params) return reply.status(400).send('No request params found!')
        const id = requestParamsId(request)
        const sessionId = request.cookies.sessionId
        const user = await knex('users')
            .where({
                id: id,
                session_id: sessionId,
            })
            .first()
        if (user === undefined) return reply.status(400).send(`User not found! ID: ${id}`)

        const redMealsQuantity = await knex('meals')
            .count('meals.id as quantity')
            .leftJoin('userMeals', function () {
                this.on('meals.id', '=', 'userMeals.mealId')
            })
            .where({
                userId: user.id,
                trafficLight: "red",
            })

        return reply.status(200).send({
            redMealsQuantity,
        })
    })

    app.get('/bestSequencyDaysOnDiet/:id', async (request, reply) => {
        const userMeals = await knex('userMeals')
            .select('*')
        return reply.status(200).send({
            userMeals,
        })
    })


}