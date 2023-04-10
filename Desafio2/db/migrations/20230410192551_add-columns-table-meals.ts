import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('meals', (table) => {
        table.text('description').after('name')
        table.timestamp('date').after('description')
        table.boolean('mealEaten').after('date')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('mels', (table) => {
        table.dropColumn('description')
        table.dropColumn('date')
        table.dropColumn('mealEaten')
    })
}

