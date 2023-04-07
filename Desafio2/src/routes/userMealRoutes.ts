import { FastifyInstance } from 'fastify'

export async function userMealRoutes(app: FastifyInstance) {

    app.get('/', (request, reply) => {
        console.log('GET USERS!')
        return reply.status(200).send('GET USERS!')
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