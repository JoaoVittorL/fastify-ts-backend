import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUserRepository } from "../../database/repositories/prisma-user-repository";
import { CreateUserUseCase } from "../../../application/use-cases/create-user.usecase";
import { ListUsersUseCase } from "../../../application/use-cases/list-users.usecase";
import { ICreateUserData } from "../../../domain/repositories/user-repository";

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, name, password } = request.body as ICreateUserData;

  if (!email || !password) {
    return reply.status(400).send({
      status: "error",
      message: "Os campos 'email' e 'password' são obrigatórios.",
    });
  }

  try {
    const userRepository = new PrismaUserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const user = await createUserUseCase.execute({ email, name, password });

    return reply.status(201).send({
      status: "success",
      message: `O usuário ${user.name} foi criado com sucesso!`,
    });
  } catch (error: unknown) {
    return reply.status(409).send({
      status: "error",
      message: "Usuário com esse email já está cadastrado.",
    });
  }
}

export async function listUsersController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userRepository = new PrismaUserRepository();
    const listUsersUseCase = new ListUsersUseCase(userRepository);
    const users = await listUsersUseCase.execute();

    const usersWithoutPassword = users.map((user) => {
      // @ts-ignore
      delete user.password;
      return user;
    });

    return reply.status(200).send({
      status: "success",
      data: usersWithoutPassword,
    });
  } catch (error: unknown) {
    return reply.status(500).send({
      status: "error",
      message: "Erro ao buscar os usuários.",
    });
  }
}
