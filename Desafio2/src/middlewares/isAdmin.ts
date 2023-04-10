import { FastifyReply, FastifyRequest } from "fastify";
import { requestParamsId } from "../types/requestParamsId";
import { knex } from "../database";

export async function isAdmin(request: FastifyRequest, reply: FastifyReply) {
    if (!request.params) return reply.status(400).send({ error: 'No request params!' })
    const id = requestParamsId(request)
    if (!id) return reply.status(400).send({ error: 'No id found!' })
    const sessionId = request.cookies.sessionId
    if (sessionId === undefined) return reply.status(400).send({ error: 'Request user not identified!' })
    const user = await knex('users')
        .where('id', id)
        .first()
    if (user === undefined) return reply.status(400).send(`User not found! ID: ${id}`)
    if (user.session_id !== sessionId) return reply.status(400).send({ error: 'User credentials not correct!' })
    const isUserAdmin = user.type === 'admin'
    console.log("Is user admin?", isUserAdmin)
    if (isUserAdmin === false) return reply.status(400).send({ error: 'Unauthorized!' })
    return
}