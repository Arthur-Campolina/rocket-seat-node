import { randomUUID } from 'node:crypto'
import { InMemoryDatabase } from './inMemoryDatabase.js'
import { buildRoutePath } from './utils/buildRoutePath.js'

const database = new InMemoryDatabase()

export const newRoutes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {

            const users = database.select('users', req.query)

            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body

            const user = {
                id: randomUUID(),
                name,
                email,
            }

            database.insert('users', user)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params

            const response = database.remove('users', id)

            if (response) return res.writeHead(204).end()

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const data = req.body

            const response = database.update('users', id, data)

            if (response) return res.writeHead(204).end()

            return res.writeHead(204).end()
        }
    },
]