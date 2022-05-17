import { NextFunction, Request, Response } from "express";
import { MongoServerError } from "mongodb";
import { CastError } from "mongoose";
import ApiError from "../types/ApiError";

/**
 * General error handler
 * @param err Error object
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = err instanceof ApiError ? err.getStatus() : 500;
  let message = err.message || "Server error";

  if (process.env.NODE_ENV === "dev") {
    console.error(`${err.name}, ${err.message}`.red);
  }

  if (err.name === "CastError") {
    const castError = err as CastError;
    message = `Invalid value: ${castError.value}`;
    status = 400;
  }

  if (err.name === "MongoServerError") {
    const mongoError = err as MongoServerError;
    if (mongoError.code === 11000) {
      message = "Violated unique constraint";
    }
  }

  return res.status(status).json({ status, message });
};

export default errorHandler;
