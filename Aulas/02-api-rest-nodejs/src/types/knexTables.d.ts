import { knex } from "knex"

export module 'knex/types/tables' {
    export interface Tables {
        transactions: {
            id: string
            title: string
            amount: number
            created_at: string
            session_id?: string
        },
        users: {
            id: string
            name: string
            email: string
        }
    }
}