import fs from "node:fs/promises"

const databasePath = new URL('in-memory-db.json', import.meta.url)

export class InMemoryDatabase {
    // make property private
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8').then(data => {
            console.log('setting db', JSON.parse(data))

            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table) {
        const data = this.#database[table] ?? []

        return data
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }

    remove(table, id) {
        const rowIndex = this.#database[table]?.findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table]?.splice(rowIndex, 1)
            this.#persist()
            return id
        }

        return ''
    }

    update(table, id, data) {
        const rowIndex = this.#database[table]?.findIndex(row => row.id === id)
        console.log('rowIndex', rowIndex)
        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data }
            this.#persist()
            return id
        }

        return ''
    }
}