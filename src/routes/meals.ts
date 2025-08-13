import { FastifyInstance } from "fastify";
import { Meal } from "knex/types/tables";
import { randomUUID } from "node:crypto";
import z from "zod";
import { db } from "../db";
import { checkUserExists } from "../middlewares/check-user-exists";

export function mealsRoutes(app: FastifyInstance) {
  app.addHook("preHandler", checkUserExists);

  app.post("/", async (request, reply) => {
    const { body, user } = request;

    const createMealSchemaBody = z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      meal_time: z.string().min(1),
      is_on_diet: z.boolean(),
    });

    const { name, description, meal_time, is_on_diet } =
      createMealSchemaBody.parse(body);

    const meal: Meal = {
      id: randomUUID(),
      name,
      description,
      meal_time,
      is_on_diet,
      created_at: new Date().toISOString(),
      user_id: user.id,
    };

    await db("meals").insert(meal);

    return reply.status(204).send();
  });

  app.get("/", async (request, reply) => {
    const { sessionId } = request.cookies;

    let meals = await db("meals as m")
      .join("users as u", "u.id", "m.user_id")
      .where("u.session_id", sessionId)
      .select(
        "m.id",
        "m.name",
        "m.description",
        "m.meal_time",
        "m.is_on_diet",
        "m.created_at",
        "m.updated_at"
      );

    meals = meals.map((meal) => ({
      ...meal,
      is_on_diet: meal.is_on_diet === 1,
    }));

    return reply.send(meals);
  });

  app.get("/:id", async (request, reply) => {
    const { sessionId } = request.cookies;

    const getMealSchemaParam = z.object({
      id: z.string(),
    });

    const { id } = getMealSchemaParam.parse(request.params);

    const meal = await db("meals as m")
      .join("users as u", "m.user_id", "u.session_id")
      .where("u.session_id", sessionId)
      .where("m.id", id)
      .select(
        "m.id",
        "m.name",
        "m.description",
        "m.created_at",
        "m.updated_at",
        "u.id as user_id"
      );

    return reply.send(meal);
  });

  app.put("/:id", (request, reply) => {
    // TODO: Editar uma refeição
    return reply.send("meals");
  });

  app.delete("/:id", (request, reply) => {
    // TODO: Apagar uma refeição
    return reply.send("meals");
  });
}
