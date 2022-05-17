import asyncHandler from "../middleware/async";
import { NextFunction, Request, Response } from "express";
import ApiError from "../types/ApiError";
import Location from "../models/Location";

/**
 * Gets all the locations.
 * @returns The list of locations
 */
export const getLocations = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const locations = await Location.find();
    return res.json(locations).status(200);
  }
);
