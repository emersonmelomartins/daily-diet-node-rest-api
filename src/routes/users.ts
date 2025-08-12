import { FastifyInstance } from "fastify";
import { db } from "../db";

export function usersRoutes(app: FastifyInstance) {
  app.get("/", async (request, response) => {
    // TODO: Criar usuário
    const teste = await db("sqlite_sequence").select();
    console.log(teste);
    return response.status(200).send(teste);
  });

  app.get("/login", (request, response) => {
    // TODO: Realizar login e salvar sessão
    response.send("users");
  });

  app.get("/metrics", (request, response) => {
    // TODO: Obter métricas do usuário
    response.send("users");
  });
}
