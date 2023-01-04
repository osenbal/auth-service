import { NextFunction, Request, Response } from "express";
import { HTTP401Error } from "../exeptions/error-exeption";
import JwtPayload from "../entities/jwt-payload";
import { JwtService } from "../use-cases/jwt/jwt-services";

export default async function validateRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // get token from header
    const token = req.headers["authorization"] as string;

    // verify token
    const jwtService = new JwtService();
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    const decoded = jwtService.verifyRefreshToken(bearerToken);

    // add user id to request
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    next(new HTTP401Error("Invalid token"));
  }
}
