import {
  IUserRepository,
  ICreateUserData,
} from "../../domain/repositories/user-repository";
import { hashSync } from "bcryptjs";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserData) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("User with this email already exists.");
    }

    const hashedPassword = hashSync(data.password, 8);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    // @ts-ignore
    delete user.password;

    return user;
  }
}
