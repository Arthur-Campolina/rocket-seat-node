import { table } from "console";
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('userMeals', (table) => {
        table.uuid('id').primary()
        table.uuid('userId').notNullable()
        table.uuid('mealId').notNullable()
        table.foreign('userId').references('id').inTable('users')
        table.foreign('mealId').references('id').inTable('meals')
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('userMeals')
}

