import { User } from "@prisma/client";

export interface ICreateUserData {
  email: string;
  name?: string;
  password: string;
}

export interface IUserRepository {
  create(data: ICreateUserData): Promise<User>;
  findMany(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
}
