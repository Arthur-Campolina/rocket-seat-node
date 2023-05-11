import { FastifyReply, FastifyRequest } from "fastify";

export async function isThereSessionId(request: FastifyRequest, reply: FastifyReply) {
    const { sessionId } = request.cookies
    if (!sessionId) reply.status(400).send({ error: 'User not identified!' })
}