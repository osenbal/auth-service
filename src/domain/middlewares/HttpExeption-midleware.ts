import { Request, Response, NextFunction } from "express";
import { BaseError } from "../exeptions/error-exeption";
// import { errorHandler } from "@utils/error-handler";

export default async function HttpExceptionMiddleware(
  error: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.httpCode || 500;
  const message = error.message || "Something went wrong";
  // await errorHandler.handleError(error);
  res.status(status).json({ status, message });
}
