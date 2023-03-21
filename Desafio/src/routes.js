import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/buildRoutePath.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.getAll('tasks')
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'GET',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            if (!req.params.id) return res.writeHead(200).end(`No id found!`)
            const { id } = req.params
            const task = database.getById('tasks', id)
            if (task) {
                return res.writeHead(200).end(JSON.stringify(task))
            }
            return res.writeHead(404).end(`Task not found! ID: ${id}`)
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body
            const tasks = database.getAll('tasks')
            const taskExist = tasks.find((t) => {
                return t.title === title.toUpperCase().trim()
            })
            if (taskExist) {
                return res.writeHead(200).end(`Task already exists! Title: ${title}`)
            }
            const task = {
                id: randomUUID(),
                title: title,
                description: description,
                completed_at: null,
                created_at: new Date(),
                updated_at: null,
            }
            database.create('tasks', task)
            return res.writeHead(201).end(`New task created! ID: ${task.id}`)
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            if (!req.params.id) return res.writeHead(200).end(`No id found!`)
            if (!req.body.title && !req.body.description) return res.writeHead(200).end(`No params found!`)
            const { id } = req.params
            const task = database.getById('tasks', id)
            if (!req.body.title) {
                if (task) {
                    const { description } = req.body
                    const updatedTask = database.update('tasks', id, description)
                    return res.writeHead(200).end(JSON.stringify(updatedTask))
                } else {
                    return res.writeHead(200).end(`Task not found! ID: ${id}`)
                }
            }
            if (!req.body.description) {
                if (task) {
                    const { title } = req.body
                    const updatedTask = database.update('tasks', id, title)
                    return res.writeHead(200).end(JSON.stringify(updatedTask))
                } else {
                    return res.writeHead(200).end(`Task not found! ID: ${id}`)
                }
            }
            const data = req.body
            const updatedTask = database.update('tasks', id, data)
            return res.writeHead(200).end(JSON.stringify(updatedTask))
        }
    },
    // {
    //     method: 'PATCH',
    //     path: buildRoutePath('/tasks/:id/complete'),
    //     handler: (req, res) => {

    //     }
    // },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            if (!req.params.id) return res.writeHead(200).end(`No id found!`)
            const { id } = req.params
            const task = database.getById('tasks', id)
            if (task) {
                database.delete('tasks', id)
                return res.writeHead(200).end()
            }
            return res.writeHead(404).end(`Task not found! ID: ${task.id}`)
        }
    },
]