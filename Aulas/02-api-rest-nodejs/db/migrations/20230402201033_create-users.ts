import { Knex } from "knex";

const TABLE_NAME = "users";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid("id").primary();
    table.text("name").notNullable();
    table.text("email").unique().notNullable;
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME);
}
