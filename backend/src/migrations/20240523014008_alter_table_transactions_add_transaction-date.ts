import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("transactions", (table) => {
    table.timestamp("transactionDate").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("transactions", (table) => {
    table.dropColumn("transactionDate");
  });
}
