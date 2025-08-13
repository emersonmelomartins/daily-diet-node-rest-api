import "knex";

declare module "knex/types/tables" {
  export interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    session_id: string;
  }

  export interface Meal {
    id: string;
    name: string;
    description: string;
    meal_time: string;
    is_on_diet: boolean;
    created_at: string;
    updated_at?: string;
    user_id: string;
  }

  interface Tables {
    users: User;
    meals: Meal;
  }
}
