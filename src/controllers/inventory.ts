import asyncHandler from "../middleware/async";
import { NextFunction, Request, Response } from "express";
import ApiError from "../types/ApiError";
import Location, { ItemLocation } from "../models/Location";

/**
 * Transfers the inventory of a single item from one location to another.
 */
export const transferInventory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { from, to, sku, quantity } = req.body;
    const fromLocation = await Location.findById(from);
    if (!fromLocation) {
      throw new ApiError(`From location with ID ${from} not found`, 404);
    }

    const toLocation = await Location.findById(to);
    if (!toLocation) {
      throw new ApiError(`To location with ID ${to} not found`, 404);
    }

    const itemFromLocation = fromLocation.items.find(
      (item) => item.sku === sku
    );
    if (!itemFromLocation) {
      throw new ApiError(`Item with ID ${sku} not found`, 404);
    } else if (quantity >= itemFromLocation.quantity) {
      throw new ApiError(
        `From location ${from} doesn't have enough quantity of item ${sku} to transfer`,
        400
      );
    }

    // Remove stock from "from" location
    const newFromQuantity = itemFromLocation.quantity - quantity;
    await ItemLocation.updateOne(
      { id: itemFromLocation._id },
      { quantity: newFromQuantity }
    );
    await fromLocation.save();
    console.log(`Removed ${quantity} from ${from}`.cyan);

    // Add stock to "to" location
    const itemToLocation = toLocation.items.find((item) => item.sku === sku);
    if (!itemToLocation) {
      throw new ApiError(`Item with ID ${sku} not found`, 404);
    }

    // Add stock to "to" location
    const newToQuantity = itemToLocation.quantity + quantity;
    await ItemLocation.updateOne(
      { id: itemToLocation._id },
      { quantity: newToQuantity }
    );
    await toLocation.save();
    console.log(`Added ${quantity} to ${to}`.cyan);

    return res.json({ success: true }).status(200);
  }
);
