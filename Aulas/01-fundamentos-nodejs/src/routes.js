import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: '/users',
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
        path: '/users',
        handler: (req, res) => {
            const { name, email } = req.body
            const users = database.select('users')
            for (const user in users)
                if (user.email === email) {
                    return res.writeHead('User already exists!', email)
                }

            const user = {
                id: randomUUID,
                name: name,
                email: email
            }
            database.insert('users', user)
            res.writeHead(201).end(JSON.stringify(user))
        }
    },
    {
        method: 'DELETE',
        path: 'users/:id',
        handler: (req, res) => {
            const { id } = req.param
            const users = database.select('users')
            if (users) {
                for (const user in users) {
                    if (user.id === id) {
                        database.delete('users', user)
                        return res.writeHead(200).end('User deleted!', JSON.stringify(id))
                    }
                }
            }
            res.writeHead(404).end('User not found!', JSON.stringify(id))
        }
    }
]