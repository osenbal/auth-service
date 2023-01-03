import express, { NextFunction, Request, Response } from "express";
import { RegisterUserUseCase } from "@domain/interfaces/use-cases/register-user";
import { ResponseObj } from "@utils/response";

export default function AuthRouter(registerUser: RegisterUserUseCase) {
  const router = express.Router();

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await registerUser.execute(req.body);
      res
        .status(201)
        .send(ResponseObj.created("User registered successfully", null));
    } catch (error) {
      next(error);
    }
  });

  return router;
}
