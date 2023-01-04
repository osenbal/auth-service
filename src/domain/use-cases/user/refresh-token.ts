import { RefreshTokenUseCase } from "@domain/interfaces/use-cases/refresh-token";
import { sign } from "jsonwebtoken";

export class RefreshToken implements RefreshTokenUseCase {
  async execute(userId: string): Promise<any> {
    // generate new token
    const accessToken = await sign(
      { id: userId },
      `${process.env.ACCESS_TOKEN_KEY!}`,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
      }
    );
    return { accessToken };
  }
}
