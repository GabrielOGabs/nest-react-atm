import { Knex } from "knex";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "docker",
      database: "atm"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./knex/migrations"
    },
    seeds: {
      directory: "./knex/seeds"
    }
  },
  test2e2: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5433,
      user: "postgres",
      password: "docker",
      database: "atm"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./knex/migrations"
    },
    seeds: {
      directory: "./knex/seeds"
    }
  }
};

export default knexConfig;
