import { model, Schema, Model, Document } from "mongoose";

interface IItem extends Document {
  sku: string;
  size: string;
  color: string;
}

const ItemSchema: Schema = new Schema({
  sku: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
});

const Item: Model<IItem> = model("Item", ItemSchema);

export default Item;
