import User, {
  checkRequiredInput,
  checkEmailStringFormat,
  checkPasswordStringFormat,
} from "@domain/entities/user";
import { UserRepository } from "@domain/interfaces/repositories/user-repository";
import { RegisterUserUseCase } from "@domain/interfaces/use-cases/register-user";
import { HTTP400Error } from "@/domain/exeptions/error-exeption";

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
    // 1. Inject repository into use case
    if (await this.userRepository.isEmailExist(user.email)) {
      throw new HTTP400Error("Email is already taken");
    }

    // 2. Call repository method to check if email is unique

    // 3. Throw error if email is not unique
    // 4. Catch error in router and return error response
    // 5. Test

    // check email is valid

    // check password is valid

    const result = await this.userRepository.register(user);
    return result;
  }
}
