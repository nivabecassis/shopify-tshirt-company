import { NextFunction, Request, Response } from "express";

/**
 * AsyncHandler function runs the given express handler within
 * a try catch block. The error is passed to the next middleware.
 * @param fn express handler function
 * @returns The result of the express handler or the next middleware
 */
const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
