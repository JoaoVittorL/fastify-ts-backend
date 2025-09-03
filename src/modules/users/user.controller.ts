import { FastifyReply, FastifyRequest } from "fastify";

export async function createUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Pega dados do body (não precisa validar agora)
  const { email, name } = request.body as { email?: string; name?: string };

  // Retorna um JSON simples
  return reply.status(200).send({
    message: "Requisição recebida!",
    email: email || null,
    name: name || null,
  });
}
