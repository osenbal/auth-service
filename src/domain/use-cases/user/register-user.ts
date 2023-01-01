import User from "../../entities/user";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { RegisterUserUseCase } from "../../interfaces/use-cases/register-user";

export class RegisterUser implements RegisterUserUseCase {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<boolean> {
    const result = await this.userRepository.register(user);
    return result;
  }
}
