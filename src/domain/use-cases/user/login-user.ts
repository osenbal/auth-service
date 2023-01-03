import User from "@/domain/entities/user";
import { LoginUserUseCase } from "@/domain/interfaces/use-cases/login-user";
import { UserRepository } from "@/domain/interfaces/repositories/user-repository";
import { HTTP403Error, HTTP404Error } from "@/domain/exeptions/error-exeption";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { json } from "stream/consumers";

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

    console.log("USER LOGGED IN: ", userFound);

    // create token
    const tokenObj = {
      accessToken: await jwt.sign(
        { id: userFound.id },
        `${process.env.ACCESS_TOKEN_KEY!}`,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
        }
      ),
      refreshToken: await jwt.sign(
        { id: userFound.id },
        `${process.env.REFRESH_TOKEN_KEY!}`,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
        }
      ),
    };

    return tokenObj;
  }
}
