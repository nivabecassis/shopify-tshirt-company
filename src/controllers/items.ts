import asyncHandler from "../middleware/async";
import { NextFunction, Request, Response } from "express";
import Item from "../models/Item";
import ApiError from "../types/ApiError";

/**
 * Creates an item with the necessary information in the request body.
 * @returns The newly created item
 */
export const createItem = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { sku, size, color } = req.body;
    const item = await Item.create({ sku, size, color });
    return res.json(item).status(200);
  }
);

/**
 * Gets all the items in the database.
 * @returns all the items
 */
export const getItems = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const items = await Item.find();
    return res.json(items).status(200);
  }
);

export const updateItem = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updatedItem = await Item.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!updatedItem) {
      throw new ApiError(`Item with ID ${id} could not be found`, 404);
    }

    return res.json(updatedItem).status(200);
  }
);

/**
 * Deletes a single item based on the _id field.
 * @param id Corresponds to the _id of the item to be deleted
 */
export const deleteItem = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      throw new ApiError(`Item with ID ${id} could not be found`, 404);
    }
    return res.json({ success: true }).status(200);
  }
);
