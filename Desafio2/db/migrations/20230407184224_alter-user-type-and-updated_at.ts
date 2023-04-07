import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.setNullable('type')
        table.setNullable('updated_at')
    })
}


export async function down(knex: Knex): Promise<void> {
}

