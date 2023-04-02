import { randomUUID } from "node:crypto"
import { FastifyInstance } from "fastify"
import { knex } from "../database.js"
import { userBodyZType } from "../types/user/requestUserBodyType.js"
import { paramsZType } from "../types/requestParamsType.js"

export async function userRoutes(app: FastifyInstance) {

    app.get('/', async (req, rep) => {
        const users = knex('users').select('*')
        return rep.status(200).send(users)
    })

    app.get('/:id', async (req, rep) => {
        const id = paramsZType(req)
        const user = knex('users').where('id', id).first()
        if (user === undefined) return rep.status(404).send(`Resource not found! ID: ${id}`)
        return rep.status(200).send({
            user,
        })
    })

    app.post('/', async (req, rep) => {
        const { name, email } = userBodyZType(req)
        const existUser = await knex('users').where('email', email).first()
        if (existUser !== undefined) {
            return rep.status(200).send(`Email already exists! E-mail: ${email}`)
        }
        const user = await knex('users').insert({
            id: randomUUID(),
            name,
            email,
        }).returning('*')
        return rep.status(201).send(user)
    })
}