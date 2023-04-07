import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('meals', (table) => {
        table.uuid('id').primary()
        table.text('name').notNullable()
        table.decimal('caloriesQuantity, 10, 2').notNullable()
        table.decimal('carbsQuantity, 10, 2').notNullable()
        table.decimal('proteinQuantity, 10, 2').notNullable()
        table.decimal('fatQuantity, 10, 2').notNullable()
        table.enum('trafficLight', ['green', 'orange', 'red']).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('meals')
}

