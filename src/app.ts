// src/app.ts
import Fastify from "fastify";
import { loggerOptions } from "./common/logger";
import { userRoutes } from "./modules/users/user.routes";
import prisma from "./common/prismaClient";

export function buildApp() {
  const app = Fastify({ logger: loggerOptions });

  // adiciona prisma no Fastify
  app.decorate("prisma", prisma);

  // registra rotas
  app.register(userRoutes, { prefix: "/users" });

  return app;
}
