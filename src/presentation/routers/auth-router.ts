import express, { NextFunction, Request, Response } from "express";
import { RegisterUserUseCase } from "@domain/interfaces/use-cases/register-user";
import { RefreshTokenUseCase } from "@domain/interfaces/use-cases/refresh-token";
import { LoginUserUseCase } from "@domain/interfaces/use-cases/login-user";
import validateRefreshToken from "@domain/middlewares/validateRefreshToken-middleware";
import { ResponseObj } from "../../utils/response";

export default function AuthRouter(
  registerUser: RegisterUserUseCase,
  loginUser: LoginUserUseCase,
  refreshToken: RefreshTokenUseCase
) {
  const router = express.Router();

  router.post(
    "/register",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await registerUser.execute(req.body);
        res
          .status(201)
          .send(ResponseObj.created("User registered successfully", null));
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/login",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await loginUser.execute(req.body);
        res
          .status(200)
          .send(ResponseObj.success("User logged in successfully", result));
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/refresh-token",
    validateRefreshToken,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await refreshToken.execute(req.body.userId);
        res
          .status(200)
          .send(ResponseObj.success("Token refreshed successfully", result));
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
}
