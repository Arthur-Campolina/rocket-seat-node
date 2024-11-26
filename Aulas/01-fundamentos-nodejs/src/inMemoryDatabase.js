import fs from "node:fs/promises"

const databasePath = new URL('in-memory-db.json', import.meta.url)

export class InMemoryDatabase {
    // make property private
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8').then(data => {

            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table, query) {
        const data = this.#database[table] ?? []

        if (query) {
            const name = query.name
            const email = query.email
            const id = query.id

            console.log(name, email, id)

            return data.filter((user) => {
                if (name) {
                    const hasUserWithThisName = user.name.toLowerCase().includes(name.toLowerCase())
                    if (hasUserWithThisName) return true
                }

                if (email) {
                    const hasUserWithThisEmail = user.email.toLowerCase().includes(email.toLowerCase())
                    if (hasUserWithThisEmail) return true
                }

                if (id) {
                    const hasUserWithThisId = user.id.toLowerCase().includes(id.toLowerCase())
                    if (hasUserWithThisId) return true
                }

                return false
            })
        }

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

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data }
            this.#persist()
            return id
        }

        return ''
    }
}