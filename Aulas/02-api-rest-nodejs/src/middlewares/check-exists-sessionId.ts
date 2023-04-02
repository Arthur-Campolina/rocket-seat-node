import { FastifyReply, FastifyRequest } from "fastify";

export async function checkIfSessionIdExists(req: FastifyRequest, reply: FastifyReply) {
    const { sessionId } = req.cookies
    if (!sessionId) reply.status(401).send({ error: 'Unauthorized!' })
}