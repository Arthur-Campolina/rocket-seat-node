import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('meals', (table) => {
        table.renameColumn('caloriesQuantity, 10, 2', 'caloriesQuantity')
        table.renameColumn('carbsQuantity, 10, 2', 'carbsQuantity')
        table.renameColumn('proteinQuantity, 10, 2', 'proteinQuantity')
        table.renameColumn('fatQuantity, 10, 2', 'fatQuantity')
    })
}


export async function down(knex: Knex): Promise<void> {
}

