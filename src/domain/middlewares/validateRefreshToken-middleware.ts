import { NextFunction, Request, Response } from "express";
import { HTTP401Error } from "../exeptions/error-exeption";
import { verify } from "jsonwebtoken";
import JwtPayload from "../entities/jwt-payload";

export default async function validateRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // get token from header
    const token = req.headers["authorization"] as string;
    console.log("Refresh Token : ", token);

    // verify token
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    const decoded = verify(
      bearerToken,
      `${process.env.REFRESH_TOKEN_KEY}`
    ) as JwtPayload;

    // add user id to request
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    next(new HTTP401Error("Invalid token"));
  }
}
