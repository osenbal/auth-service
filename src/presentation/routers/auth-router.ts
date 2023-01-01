import express, { Request, Response } from "express";
import { RegisterUserUseCase } from "../../domain/interfaces/use-cases/register-user";

export default function AuthRouter(registerUser: RegisterUserUseCase) {
  const router = express.Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      await registerUser.execute(req.body);
      res.statusCode = 201;
      res.json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return router;
}
