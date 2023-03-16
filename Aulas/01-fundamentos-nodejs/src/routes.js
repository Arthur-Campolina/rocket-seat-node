import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/buildRoutePath.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const users = database.select('users')
            if (users) {
                return res.end(JSON.stringify(users))
            } else {
                console.error('Users not found')
                return
            }
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body
            const users = database.select('users')

            const emailExist = users.find(u => {
                return u.email === email
            })
            if (emailExist) {
                return res.writeHead(200).end(`User already exists! email: ${email}`)
            }

            const user = {
                id: randomUUID(),
                name: name,
                email: email
            }
            database.insert('users', user)
            return res.writeHead(201).end(`New user created! id: ${user.id}`)
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const users = database.select('users')

            const idExists = users.find(u => {
                return u.id === id
            })
            if (!idExists) {
                return res.writeHead(404).end(`User not found! id: ${id}`)
            }

            database.delete('users', id)
            return res.writeHead(204).end()
        }
    }
]