import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { InMemoryDatabase } from './inMemoryDatabase.js'
import { bufferMiddleware } from './middlewares/middleware.js'

const database = new InMemoryDatabase()

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await bufferMiddleware(req, res)

    if (method === 'GET' && url === '/users') {
        const users = database.select('users')

        return res.end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body

        const user = {
            id: randomUUID(),
            name,
            email,
        }

        database.insert('users', user)

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)