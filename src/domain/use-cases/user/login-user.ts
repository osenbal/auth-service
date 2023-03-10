import User from "@domain/entities/user";
import { LoginUserUseCase } from "@domain/interfaces/use-cases/user/login-user";
import { UserRepository } from "@domain/interfaces/repositories/user-repository";
import { HTTP403Error, HTTP404Error } from "@/domain/exeptions/error-exeption";
import { JwtService } from "../jwt/jwt-services";
import bcrypt from "bcrypt";

export class LoginUser implements LoginUserUseCase {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<any> {
    // check user exist and validation password user
    const userFound = await this.userRepository.getUserByEmail(user.email);

    if (!userFound) throw new HTTP404Error("User not found");
    const isPasswordValid = await bcrypt.compare(
      user.password,
      userFound.password
    );
    if (!isPasswordValid) throw new HTTP403Error("Invalid password");

    // create token
    const jwtService = new JwtService();
    const tokenObj = {
      accessToken: jwtService.createAccessToken({
        id: userFound._id?.toString()!,
      }),
      refreshToken: jwtService.createRefreshToken({
        id: userFound._id?.toString()!,
      }),
    };

    return tokenObj;
  }
}
