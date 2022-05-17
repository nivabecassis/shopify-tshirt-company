import { model, Schema, Model, Document, Types } from "mongoose";
import { ILocation } from "./Location";

export interface IItem extends Document {
  sku: string;
  size: string;
  color: string;
}

const ItemSchema: Schema = new Schema({
  sku: { type: String, required: true, unique: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
});

// TODO after updating the sku, change values in locations
// TODO after updating the color, verify if sku was changed (otherwise change the sku auto)
// TODO before transferring stock, verify if there is enough in origin location
// TODO calculate total stock based on all the locations

const Item: Model<IItem> = model("Item", ItemSchema);

export default Item;
