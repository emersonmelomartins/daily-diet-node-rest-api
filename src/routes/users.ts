import { FastifyInstance } from "fastify";
import { User } from "knex/types/tables";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "../db";

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

    const newUser = await db("users").insert(user).returning("*");

    reply.setCookie("sessionId", session_id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 1, // 1 Dia
    });

    return reply.status(200).send(newUser);
  });

  app.get("/login", (request, reply) => {
    // TODO: Realizar login e salvar sessão
    reply.send("users");
  });

  app.get("/metrics", (request, reply) => {
    // TODO: Obter métricas do usuário
    reply.send("users");
  });
}
