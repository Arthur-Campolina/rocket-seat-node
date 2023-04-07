import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { requestBodyUser } from '../types/requestBodyUser'
import { randomUUID } from 'node:crypto'
import { isAdmin } from '../middlewares/isAdmin'

export async function userRoutes(app: FastifyInstance) {

    app.get('/:id', { preHandler: isAdmin }, async (request, reply) => {
        const users = await knex('users').select('*')
        return reply.status(200).send({
            users,
        })
    })

    app.post('/', async (request, reply) => {
        if (!request) return reply.status(400).send('No request found!')
        const body = requestBodyUser(request)
        if (!body) return reply.status(400).send('No body found!')

        let sessionId = request.cookies.sessionId
        if (!sessionId) {
            sessionId = randomUUID()
            reply.cookie('sessionId', sessionId, {
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            })
        }
        const user = await knex('users').insert({
            id: randomUUID(),
            name: body.name,
            email: body.email,
            type: body.type ? body.type : 'user',
            session_id: sessionId,
        }).returning('*')
        return reply.status(201).send({
            user,
        })
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