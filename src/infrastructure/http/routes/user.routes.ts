import { FastifyInstance } from "fastify";
import {
  createUserController,
  listUsersController,
} from "../controllers/user.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/", createUserController);
  app.get("/", listUsersController);
}
