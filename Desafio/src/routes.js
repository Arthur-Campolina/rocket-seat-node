import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/buildRoutePath.js'
import { csvParser } from './utils/csvParser.js'

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
        handler: async (req, res) => {
            if (!req.headers) return res.writeHead(200).end(`No headers found!`)
            const contentType = Object.entries(req.headers).at(0).reduce(function (key, value) {
                const string = value.toString()
                return string
            })
            if (contentType !== 'multipart/form-data') {
                if (!req.body.title && !req.body.description) return res.writeHead(200).end(`No params found!`)
                const { title, description } = req.body
                const tasks = database.getAll('tasks')
                const taskExist = tasks.find((t) => {
                    return t.title === title.toUpperCase().trim()
                })
                if (taskExist !== undefined) {
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
                return res.writeHead(201).end(JSON.stringify(task))
            } else {
                const tasks = await csvParser()
                const tasksInDatabase = database.getAll('tasks')
                const tasksToPersist = []
                for (const task of tasks) {
                    const { title } = task
                    const taskExist = tasksInDatabase.find((t) => {
                        return t.title === title.toUpperCase().trim()
                    })
                    if (taskExist !== undefined) {
                        console.log(`Task already exists! Title: ${title}`)
                    } else {
                        tasksToPersist.push(task)
                        console.log(`Task not existent in the database! Title: ${title}`)
                    }
                }
                for (const taskToPersist of tasksToPersist) {
                    database.create('tasks', taskToPersist)
                    console.log(`Task persisted! Title: ${taskToPersist.title}`)
                }
                return res.writeHead(201).end(tasksToPersist.length === 0 ? 'All tasks already exist!' : JSON.stringify(tasksToPersist))
            }
        }
    },

    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            if (!req.params.id) return res.writeHead(200).end(`No id found!`)
            if (!req.body.title && !req.body.description) return res.writeHead(200).end(`No params found!`)
            const { title, description } = req.body
            const { id } = req.params
            const task = database.getById('tasks', id)
            if (task) {
                task.title = title
                task.description = description
                const updatedTask = database.update('tasks', id, task)
                return res.writeHead(200).end(JSON.stringify(updatedTask))
            } else {
                return res.writeHead(200).end(`Task not found! ID: ${id} `)
            }
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            if (!req.params.id) return res.writeHead(200).end(`No id found!`)
            const { id } = req.params
            const task = database.getById('tasks', id)
            if (task) {
                if (task.completed_at === null) {
                    const task = database.completeTask('tasks', id)
                    const formattedCompletedTaskDate = new Intl.DateTimeFormat(['pt-br', 'id']).format(task.completed_at)
                    res.writeHead(201).end(`Task ID: ${id} completed on ${formattedCompletedTaskDate} ! `)
                } else {
                    const task = database.completeTask('tasks', id)
                    const formattedCompletedTaskDate = new Intl.DateTimeFormat(['pt-br', 'id']).format(task.completed_at)
                    return res.writeHead(200).end(`Task ID: ${id} already completed on ${formattedCompletedTaskDate} `)
                }
            } else {
                return res.writeHead(404).end(`Task not found! ID: ${id} `)
            }

        }
    },
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
            return res.writeHead(404).end(`Task not found! ID: ${id} `)
        }
    },
]