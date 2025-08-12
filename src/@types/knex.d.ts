import "knex";

// TODO: Criar tipos das tabelas
declare module "knex/types/tables" {
  export interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    session_id: string;
  }

  interface Tables {
    users: User;
  }
}
