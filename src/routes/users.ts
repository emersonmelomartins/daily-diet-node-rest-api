import { FastifyInstance } from "fastify";
import { User } from "knex/types/tables";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "../db";
import { checkUserExists } from "../middlewares/check-user-exists";

export function usersRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
    });

    const { name, email } = createUserBodySchema.parse(request.body);

    const alreadyExists = await db("users").where("email", email).first();

    if (alreadyExists) {
      return reply.status(400).send("User already exists!");
    }

    const session_id = randomUUID();

    const user: User = {
      id: randomUUID(),
      session_id,
      name,
      email,
      created_at: new Date().toISOString(),
    };

    await db("users").insert(user);

    reply.setCookie("sessionId", session_id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 1, // 1 Dia
    });

    return reply.status(204).send();
  });

  app.post("/login", async (request, reply) => {
    const { body } = request;

    const loginSchemaBody = z.object({
      email: z.email(),
    });

    const { email } = loginSchemaBody.parse(body);

    const user = await db("users").where("email", email).first();

    if (!user) {
      return reply.status(404).send("User not found.");
    }

    const session_id = randomUUID();

    await db("users").update("session_id", session_id).where("id", user.id);

    reply.setCookie("sessionId", session_id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 1, // 1 Dia
    });

    return reply.status(204).send();
  });

  app.get(
    "/metrics",
    {
      preHandler: checkUserExists,
    },
    async (request, reply) => {
      const { id: user_id } = request.user;

      let meals = await db("meals as m").where("user_id", user_id);
      meals = meals
        .map((meal) => ({
          ...meal,
          is_on_diet: meal.is_on_diet === 1,
        }))
        .sort((a, b) => a.meal_time.localeCompare(b.meal_time));

      const totalMeals = meals.length;
      const totalMealsOnDiet = meals.filter((meal) => meal.is_on_diet).length;
      const totalMealsNotOnDiet = meals.filter(
        (meal) => !meal.is_on_diet
      ).length;

      let bestSequencialStreak = 0;
      let streakCounter = 0;
      for (let i = 0; i < meals.length; i++) {
        const currentMeal = meals[i];

        if (currentMeal.is_on_diet) {
          streakCounter++;
        } else {
          streakCounter = 0;
        }

        if (streakCounter > bestSequencialStreak) {
          bestSequencialStreak = streakCounter;
        }
      }

      return reply.send({
        totalMeals,
        totalMealsOnDiet,
        totalMealsNotOnDiet,
        bestSequencialStreak,
      });
    }
  );
}
