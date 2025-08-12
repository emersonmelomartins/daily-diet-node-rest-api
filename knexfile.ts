import type { Knex } from "knex";
import { knexOptions } from "./src/db";

const config: { [key: string]: Knex.Config } = {
  development: knexOptions,

  production: {
    // client: "postgresql",
    // connection: {
    //   database: "my_db",
    //   user: "username",
    //   password: "password"
    // },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   tableName: "knex_migrations"
    // }
  },
};

module.exports = config;
