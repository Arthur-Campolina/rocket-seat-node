import fs from 'node:fs/promises'

const databaseRoute = new URL('../database.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databaseRoute, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile('database.json', JSON.stringify(this.#database))
    }

    getAll(table) {
        const data = this.#database[table] ?? []
        return data
    }
    getById(table, id) {
        const rowIndex = this.#database[table].findIndex((row) => row.id === id)
        if (rowIndex > -1) {
            const task = this.#database[table][rowIndex]
            return task
        }
        return null
    }
    create(table, data) {
        //validar criação de dados para tudo upper case
        if (Array.isArray(this.#database[table])) {
            const title = data.title.toUpperCase().trim()
            const description = data.description.toUpperCase().trim()
            data.title = title
            data.description = description
            this.#database[table].push(data)
        } else {
            this.#database[table] = []
            const title = data.title.toUpperCase().trim()
            const description = data.description.toUpperCase().trim()
            data.title = title
            data.description = description
            this.#database[table].push(data)
        }
        this.#persist()
        return data
    }

    update(table, id, data) {
        if (Array.isArray(this.#database[table])) {
            const rowIndex = this.#database[table].findIndex((row) => row.id === id)
            if (rowIndex > -1) {
                const task = this.#database[table][rowIndex]
                if (data) {
                    task.title = data.title ? data.title.toUpperCase() : task.title
                    task.description = data.description ? data.description.toUpperCase() : task.description
                    task.updated_at = new Date()
                    this.#database[table][rowIndex] = task
                    this.#persist()
                    return task
                }
            }
        } else {
            return null
        }
    }

    completeTask(table, id) {
        if (Array.isArray(this.#database[table])) {
            const rowIndex = this.#database[table].findIndex(row => row.id === id)
            if (rowIndex > -1) {
                const task = this.#database[table][rowIndex]
                if (task.completed_at === null) {
                    task.completed_at = new Date()
                    this.#persist()
                    return task
                }
                else {
                    return task
                }
            }
        }
    }

    delete(table, id) {
        if (Array.isArray(this.#database[table])) {
            const rowIndex = this.#database[table].findIndex(row => row.id === id)
            if (rowIndex > -1) {
                this.#database[table].splice(rowIndex, 1)
                this.#persist()
            }
            return null
        }
    }
}
