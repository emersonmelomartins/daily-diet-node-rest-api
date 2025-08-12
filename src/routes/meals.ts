import { FastifyInstance } from "fastify";

export function mealsRoutes(app: FastifyInstance) {
  app.get("/", (request, response) => {
    // TODO: Listar todas as refeições
    response.send("meals");
  });

  app.get("/:id", (request, response) => {
    // TODO: Obter uma refeição
    response.send("meals");
  });

  app.put("/:id", (request, response) => {
    // TODO: Editar uma refeição
    response.send("meals");
  });

  app.delete("/:id", (request, response) => {
    // TODO: Apagar uma refeição
    response.send("meals");
  });
}
