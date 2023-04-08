import { FastifyReply, FastifyRequest } from "fastify";
import { requestParamsId } from "../types/requestParamsId";
import { knex } from "../database";

export async function isAdmin(request: FastifyRequest, reply: FastifyReply) {
    if (!request.params) return reply.status(400).send({ error: 'Unautorized!' })
    const id = requestParamsId(request)
    if (!id) return reply.status(400).send({ error: 'Unautorized!' })
    const user = await knex('users').where('id', id).first()
    if (user === undefined) return reply.status(400).send(`User not found! ID: ${id}`)
    const isUserAdmin = user.type === 'admin'
    if (isUserAdmin === false) return reply.status(400).send({ error: 'Unautorized!' })
    return
}