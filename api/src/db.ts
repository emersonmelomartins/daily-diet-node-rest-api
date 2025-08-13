import type { Knex } from "knex";
import knex from "knex";
import { env } from "./env";

export const knexOptions: Knex.Config = {
  client: env.DB_CLIENT,
  connection: {
    filename: env.DB_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

export const db = knex(knexOptions);
