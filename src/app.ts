import Fastify from "fastify";
import cors from "@fastify/cors";
import { loggerOptions } from "./common/logger";
import { userRoutes } from "./infrastructure/http/routes/user.routes";
import prisma from "./common/prismaClient";

export function buildApp() {
  const app = Fastify({ logger: loggerOptions });

  app.register(cors, {
    origin: "*",
  });

  app.decorate("prisma", prisma);

  app.register(userRoutes, { prefix: "/users" });

  return app;
}
