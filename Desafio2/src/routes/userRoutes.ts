import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { requestBodyUser } from '../types/requestBodyUser'
import { randomUUID } from 'node:crypto'
import { isAdmin } from '../middlewares/isAdmin'
import { requestParamsId } from '../types/requestParamsId'
import { isThereSessionId } from '../middlewares/isThereSessionId'

export async function userRoutes(app: FastifyInstance) {

    app.get('/all/:id', { preHandler: isAdmin }, async (request, reply) => {
        const users = await knex('users').select('*')
        return reply.status(200).send({
            users,
        })
    })

    app.get('/:id', { preHandler: isThereSessionId }, async (request, reply) => {
        const id = requestParamsId(request)
        const sessionId = request.cookies.sessionId
        const user = await knex('users')
            .where({
                id: id,
            })
            .first()
        if (user === undefined) return reply.status(400).send(`User not found! ID: ${id}`)
        if (user.session_id !== sessionId || user.type !== 'admin') return reply.status(400).send({ error: 'Unauthorized!' })
        return reply.status(200).send({
            user,
        })
    })

    app.post('/', { preHandler: isAdmin }, async (request, reply) => {
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
        const user = await knex('users')
            .insert({
                id: randomUUID(),
                name: body.name,
                email: body.email,
                type: body.type ? body.type : 'user',
                session_id: sessionId,
            })
            .returning('*')
        return reply.status(201).send({
            user,
        })
    })

    app.put('/:id', { preHandler: isThereSessionId }, async (request, reply) => {
        if (!request.body) return reply.status(400).send('No request body found!')
        const id = requestParamsId(request)
        const sessionId = request.cookies.sessionId
        const user = await knex('users')
            .where({
                id: id,
                session_id: sessionId,
            })
            .first()
        if (user === undefined) return reply.status(400).send(`User not found! ID: ${id}`)
        if (user.session_id === sessionId || user.type === 'admin') {
            const { name, email, type } = requestBodyUser(request)
            const updatedUser = await knex('users')
                .where('id', id)
                .update({
                    name,
                    email,
                    type,
                    updated_at: knex.fn.now()
                })
                .returning('*')
            return reply.status(200).send({
                updatedUser,
            })
        } else {
            return reply.status(400).send('Unauthorized!')
        }
    })

    app.delete('/:id', { preHandler: isThereSessionId }, async (request, reply) => {
        const id = requestParamsId(request)
        const sessionId = request.cookies.sessionId
        const user = await knex('users')
            .where({
                id: id,
                session_id: sessionId,
            })
            .first()
        if (user === undefined) return reply.status(400).send(`User not found! ID: ${id}`)
        if (user.session_id === sessionId || user.type === 'admin') {
            await knex('users').where('id', id).delete('*')
            return reply.status(200).send()
        } else {
            return reply.status(400).send('Unauthorized!')
        }
    })
}