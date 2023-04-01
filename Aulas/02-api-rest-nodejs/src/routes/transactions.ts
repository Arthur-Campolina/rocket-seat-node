import { randomUUID } from "node:crypto"
import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { bodyZType } from "../types/requestBodyType.js"
import { paramsZType } from "../types/requestParamsType"

export async function transactionRoutes(app: FastifyInstance) {

    app.get('/', async (req, rep) => {
        const transactions = await knex('transactions').select('*')
        return rep.status(200).send({
            transactions,
        })
    })
    app.get('/:id', async (req, rep) => {
        if (!req) return rep.status(400).send('No request found!')
        const id = paramsZType(req)
        const transaction = await knex('transactions').where('id', id).first()
        if (!transaction) return rep.status(404).send(`Resource not found! ID: ${id}`)
        return rep.status(200).send({
            transaction,
        })
    })

    app.post('/', async (req, rep) => {
        if (!req) return rep.status(400).send('No request found!')
        const body = bodyZType(req)
        if (!body) console.error('No body found!')
        await knex('transactions').insert({
            id: randomUUID(),
            title: body.title,
            amount: body.type === 'credit' ? body.amount : body.amount * -1
        })
        return rep.status(201).send('Transaction Created!')
    })

    app.delete('/:id', async (req, rep) => {
        if (!req) return rep.status(400).send('No request found!')
        const id = paramsZType(req)
        if (!id) return rep.status(404).send(`Resource not found! ID: ${id}`)
        await knex('transactions').where('id', id).delete()
        return rep.status(200).send(`Transaction deleted! ID: ${id}`)
    })
}
