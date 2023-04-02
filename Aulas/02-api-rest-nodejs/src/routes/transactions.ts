import { randomUUID } from "node:crypto"
import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { transactionBodyZType } from "../types/transaction/requestTransactionBodyType"
import { paramsZType } from "../types/requestParamsType"
import { checkIfSessionIdExists } from "../middlewares/check-exists-sessionId"

export async function transactionRoutes(app: FastifyInstance) {

    app.get('/', { preHandler: checkIfSessionIdExists }, async (req, rep) => {
        const { sessionId } = req.cookies
        const transactions = await knex('transactions')
            .where('session_id', sessionId)
            .select('*')
        return rep.status(200).send({
            transactions,
        })
    })

    app.get('/:id', { preHandler: checkIfSessionIdExists }, async (req, rep) => {
        if (!req) return rep.status(400).send('No request found!')
        const { sessionId } = req.cookies
        const id = paramsZType(req)
        const transaction = await knex('transactions')
            .where({
                id,
                'session_id': sessionId
            })
            .first()
        if (transaction === undefined) return rep.status(404).send(`Resource not found! ID: ${id}`)
        return rep.status(200).send({
            transaction,
        })
    })

    app.get('/totalAmount', { preHandler: checkIfSessionIdExists }, async (req, rep) => {
        const { sessionId } = req.cookies
        const totalAmount = await knex('transactions').where('session_id', sessionId).sum('amount', {
            as: 'totalAmount'
        }).first()
        return rep.status(200).send(totalAmount)
    })

    app.post('/', async (req, rep) => {
        if (!req) return rep.status(400).send('No request found!')
        const body = transactionBodyZType(req)
        if (!body) console.error('No body found!')

        let sessionId = req.cookies.sessionId
        if (!sessionId) {
            sessionId = randomUUID()
            rep.cookie('sessionId', sessionId, {
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            })
        }
        await knex('transactions').insert({
            id: randomUUID(),
            title: body.title,
            amount: body.type === 'credit' ? body.amount : body.amount * -1,
            session_id: sessionId,
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
