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
    // getById(table, id) {

    // }
    create(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = []
            this.#database[table].push(data)
        }
        this.#persist()
        return data
    }
    // update(table, id, data) {

    // }
    // delete(table, id) {

    // }
}