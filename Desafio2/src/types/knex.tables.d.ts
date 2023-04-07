import knex from "knex"

declare module 'knex/types/tables' {
    export interface Tables {
        users: {
            id: string
            session_id?: string
            name: string
            email: string
            type?: string
            created_at: string
            updated_at?: string
        },
        meals: {
            id: string
            name: string,
            caloriesQuantity: string
            carbsQuantity: string
            proteinQuantity: string
            fatQuantity: string
            trafficLight: string
            created_at: string
            updated_at: string
        },
        userMeals: {
            id: string
            userId: string
            mealId: string
            created_at: string
        },
    }
}