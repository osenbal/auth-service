import { UserRepository } from "@domain/interfaces/repositories/user-repository";
import { RegisterUserUseCase } from "@domain/interfaces/use-cases/user/register-user";
import { HTTP400Error, HTTP500Error } from "../../exeptions/error-exeption";
import User, {
  checkRequiredInput,
  checkEmailStringFormat,
  checkPasswordStringFormat,
} from "../../entities/user";
import bcrypt from "bcrypt";

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

    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) throw new HTTP500Error("Hashing password failed");
    user.password = hashedPassword;

    const result = await this.userRepository.register(user);
    return result;
  }
}
