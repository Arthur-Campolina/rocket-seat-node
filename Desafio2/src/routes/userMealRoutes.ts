import { FastifyInstance } from 'fastify'
import { knex } from '../database'

export async function userMealRoutes(app: FastifyInstance) {

    app.get('/', async (request, reply) => {
        const userMeals = await knex('userMeals')
            .select('*')
        return reply.status(200).send({
            userMeals,
        })
    })

    app.post('/', (request, reply) => {
        console.log('POST USERS!')
        return reply.status(200).send('POST USERS!')
    })

    app.put('/', (request, reply) => {
        console.log('PUT USERS!')
        return reply.status(200).send('PUT USERS!')
    })

    app.patch('/', (request, reply) => {
        console.log('PATCH USERS!')
        return reply.status(200).send('PATCH USERS!')
    })

    app.delete('/', (request, reply) => {
        console.log('DELETE USERS!')
        return reply.status(200).send('DELETE USERS!')
    })

}