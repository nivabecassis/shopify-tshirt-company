import asyncHandler from "../middleware/async";
import { NextFunction, Request, Response } from "express";
import Item from "../models/Item";
import ApiError from "../types/ApiError";

/**
 * Gets all the items in the database.
 * @returns all the items
 */
export const getItems = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const items = await Item.find();
    res.json(items).status(200);
  }
);

/**
 * Deletes a single item based on the _id field.
 * @param id Corresponds to the _id of the item to be deleted
 */
export const deleteItem = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      throw new ApiError(`Item with ID ${id} could not be found`, 404);
    }

    // TODO Remove stock from locations after deleting this item
    await item.deleteOne();
    res.json({ success: true }).status(200);
    return next();
  }
);
