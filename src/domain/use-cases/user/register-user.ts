import { UserRepository } from "@domain/interfaces/repositories/user-repository";
import { RegisterUserUseCase } from "@domain/interfaces/use-cases/register-user";
import { HTTP400Error } from "../../exeptions/error-exeption";
import User, {
  checkRequiredInput,
  checkEmailStringFormat,
  checkPasswordStringFormat,
} from "../../entities/user";

export class RegisterUser implements RegisterUserUseCase {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<boolean> {
    if (!checkRequiredInput(user)) {
      throw new HTTP400Error("Invalid input");
    }

    if (!checkEmailStringFormat(user.email)) {
      throw new HTTP400Error("Invalid email");
    }

    if (!checkPasswordStringFormat(user.password)) {
      throw new HTTP400Error("Invalid password");
    }

    // check email is unique

    if (await this.userRepository.isEmailExist(user.email)) {
      throw new HTTP400Error("Email is already taken");
    }

    // 5. Test

    const result = await this.userRepository.register(user);
    return result;
  }
}
