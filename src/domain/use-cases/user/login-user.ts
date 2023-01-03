import User from "@/domain/entities/user";
import { LoginUserUseCase } from "@/domain/interfaces/use-cases/login-user";
import { UserRepository } from "@/domain/interfaces/repositories/user-repository";
import { HTTP403Error, HTTP404Error } from "@/domain/exeptions/error-exeption";

export class LoginUser implements LoginUserUseCase {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<User> {
    // check if email exists
    if (!(await this.userRepository.isEmailExist(user.email))) {
      throw new HTTP404Error("Email is not exist");
    }

    // validation password user
    if (
      !(await this.userRepository.validatePassword(user.email, user.password))
    ) {
      throw new HTTP403Error("Invalid password");
    }

    const result = await this.userRepository.login(user.email, user.password);
    return result;
  }
}
