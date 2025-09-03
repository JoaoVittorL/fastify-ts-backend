import { FastifyInstance } from "fastify";
import { createUserHandler } from "./user.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/", createUserHandler);
}
