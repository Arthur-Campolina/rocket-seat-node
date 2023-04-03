import { afterAll, beforeAll, it, describe, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app.js'

describe('Transactions', () => {

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
})
