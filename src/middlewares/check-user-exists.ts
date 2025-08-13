import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db";

export async function checkUserExists(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sessionId } = request.cookies;

  if (!sessionId) {
    return reply.status(401).send("Unauthorized.");
  }

  const user = await db("users").where("session_id", sessionId).first();

  if (!user) {
    return reply.status(404).send("User not found.");
  }

  request.user = user;
}
