import { Database } from './database.js'
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {
            const tasks = database.getAll('tasks')
            return res.end(JSON.stringify(tasks))
        }
    },
    // {
    //     method: 'GET',
    //     path: '/tasks/:id',
    //     handler: (req, res) => {

    //     }
    // },
    {
        method: 'POST',
        path: '/tasks',
        handler: (req, res) => {
            const { title, description } = req.body
            const tasks = database.getAll('tasks')
            const taskExist = tasks.find((t) => {
                return t.title === title
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
    // {
    //     method: 'PUT',
    //     path: '/tasks/:id',
    //     handler: (req, res) => {

    //     }
    // },
    // {
    //     method: 'PATCH',
    //     path: '/tasks/:id/complete',
    //     handler: (req, res) => {

    //     }
    // },
    // {
    //     method: 'DELETE',
    //     path: '/tasks/:id',
    //     handler: (req, res) => {

    //     }
    // },
]