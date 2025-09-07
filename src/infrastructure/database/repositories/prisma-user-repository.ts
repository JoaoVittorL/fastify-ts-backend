import { User } from "@prisma/client";
import {
  IUserRepository,
  ICreateUserData,
} from "../../../domain/repositories/user-repository";
import prisma from "../../../common/prismaClient";

export class PrismaUserRepository implements IUserRepository {
  async create(data: ICreateUserData): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });
    return user;
  }

  async findMany(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }
}
