import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transactions", (table) => {
    table.uuid("id").primary();
    table.uuid("accountId").notNullable().references("id").inTable("accounts");
    table.decimal("amount", 14, 2).notNullable().defaultTo(0);
    table.string("type").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("transactions");
}
