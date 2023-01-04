import { RefreshTokenUseCase } from "@domain/interfaces/use-cases/user/refresh-token";
import { JwtService } from "../jwt/jwt-services";

export class RefreshToken implements RefreshTokenUseCase {
  async execute(userId: string): Promise<any> {
    // generate new token
    const jwtService = new JwtService();
    const accessToken = jwtService.createAccessToken({ id: userId });
    return { accessToken };
  }
}
