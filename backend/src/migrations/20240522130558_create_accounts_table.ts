import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("accounts", (table) => {
    table.uuid("id").primary();
    table.uuid("userId").notNullable().references("id").inTable("users");
    table.string("name").notNullable().unique();
    table.decimal("balance", 14, 2).notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("accounts");
}
