/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import logger from "../utils/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({
      errors: err.serializeErrors()
    });
    return;
  }
  logger.error(err.message);
  res.status(400).send({
    errors: [{ message: "Something went wrong." }]
  });
};
