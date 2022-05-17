import { model, Schema, Model, Document, Types } from "mongoose";
import Location, { ILocation } from "./Location";

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

ItemSchema.post("findOneAndDelete", async function (deletedItem, next) {
  console.log(`Items being removed from the locations ${deletedItem.sku}`);
  const locations = await Location.find();
  locations.forEach(async (loc) => {
    const itemIndex = loc.items.findIndex(
      (item) => item.sku === deletedItem.sku
    );

    loc.items.splice(itemIndex, 1);
    await loc.save();
  });
  next();
});

const Item: Model<IItem> = model("Item", ItemSchema);

export default Item;
