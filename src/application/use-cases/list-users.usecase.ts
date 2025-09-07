import { IUserRepository } from "../../domain/repositories/user-repository";

export class ListUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute() {
    const users = await this.userRepository.findMany();
    return users;
  }
}