import "fastify";
import { User } from "knex/types/tables";

declare module "fastify" {
  interface FastifyRequest {
    user: User;
  }
}
