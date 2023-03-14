import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8').then(data => {
            this.#database = JSON.parse(data)
        })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile('db.json', JSON.stringify(this.#database))
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

    // update(table, data) {
    //     const uuid = data.randomUUID
    //     if (Array.isArray(this.#database[table])) {
    //         const all = select(table)
    //         for (const item in all) {
    //             if (item.randomUUID === uuid) {

    //             }
    //         }
    //     }
    // }

    delete(table, data) {
        if (table === 'users') {
            const userID = data.id
            if (Array.isArray(this.#database[table])) {
                const users = select(table)
                for (const user in users) {
                    if (user.id === userID) {
                        this.#database[table].delete(user)
                    }
                }
            }
        }
        return data
    }
}
