import type { Knex } from "knex";
import { knexOptions } from "./src/db";

const config: { [key: string]: Knex.Config } = {
  development: knexOptions,
  test: knexOptions,
};

module.exports = config;
