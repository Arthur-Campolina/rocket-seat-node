import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/buildRoutePath.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { search } = req.query
            const users = database.getAll('users', search ? {
                name: search,
                email: search
            } : null)
            if (users) {
                return res.end(JSON.stringify(users))
            } else {
                console.error('Users not found')
                return
            }
        }
    },
    {
        method: 'GET',
        path: buildRoutePath('/user/:id'),
        handler: (req, res) => {
            const { id } = req.params
            if (!id) return console.error(`Id not found! id: ${id}`)
            const user = database.getByID('users', id)
            if (user) {
                return res.end(JSON.stringify(user))
            } else {
                console.error(`User not found! id: ${email}`)
                return
            }
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body
            if (!name && !email) {
                return console.error(`Email and Name not found! name: ${name}, email: ${email}`)
            }
            const users = database.getAll('users')
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
            database.create('users', user)
            return res.writeHead(201).end(`New user created! id: ${user.id}`)
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { name, email } = req.body
            if (!id) return console.error(`ID not found! id: ${id}`)
            if (!name && !email) {
                return console.error(`Email and Name not found! name: ${name}, email: ${email}`)
            }

            const user = database.getByID('users', id)
            if (!user) {
                return res.writeHead(404).end(`User not found! id: ${id}`)
            }
            if (!name) database.update('users', id, { email })
            if (!email) database.update('users', id, { name })
            if (name && email) database.update('users', id, { name, email })
            return res.writeHead(204).end(`User updated! id: ${id}`)
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const users = database.getAll('users')
            if (!id) return console.error(`Id not found! id: ${id}`)
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