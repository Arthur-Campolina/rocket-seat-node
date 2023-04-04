import { execSync } from 'node:child_process' // executa comando no terminal por dentro do node
import { beforeEach, afterAll, beforeAll, it, describe, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app.js'

describe('Transactions', () => {

    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('should create a new transaction', async () => {
        await request(app.server)
            .post('/transactions')
            .send({
                title: 'Transaction test',
                amount: 1000,
                type: 'credit'
            })
            .expect(201)
    })

    it('should list all transactions', async () => {
        const response = await request(app.server)
            .post('/transactions')
            .send({
                title: 'Transaction test',
                amount: 1000,
                type: 'credit'
            })
        const cookie = response.get('Set-Cookie')

        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookie)
            .expect(200)

        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'Transaction test',
                amount: 1000,
            }),
        ])
    })

    it('should get a transaction by ID', async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'Transaction test',
                amount: 1000,
                type: 'credit'
            })
        const cookie = createTransactionResponse.get('Set-Cookie')

        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookie)
            .expect(200)

        const transactionId = listTransactionsResponse.body.transactions[0].id

        const getTransactionResponse = await request(app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', cookie)
            .expect(200)

        expect(getTransactionResponse.body.transaction).toEqual(
            expect.objectContaining({
                title: 'Transaction test',
                amount: 1000,
            }),
        )
    })


    it('should get totalAmount', async () => {
        const createTransactionResponseDebit = await request(app.server)
            .post('/transactions')
            .send({
                title: 'Debit Transaction test',
                amount: 1000,
                type: 'debit'
            })
        const cookie = createTransactionResponseDebit.get('Set-Cookie')
        await request(app.server)
            .post('/transactions')
            .set('Cookie', cookie)
            .send({
                title: 'Credit Transaction test',
                amount: 1000,
                type: 'credit'
            })
        const totalAmountResponse = await request(app.server)
            .get('/transactions/totalAmount')
            .set('Cookie', cookie)
            .expect(200)
        console.log(totalAmountResponse.body.totalAmount)
        expect(totalAmountResponse.body.totalAmount).toEqual({
            totalAmount: 0
        })
    })
})
