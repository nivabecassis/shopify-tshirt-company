import { Types, Schema, Model, model, Document } from "mongoose";
import Item from "./Item";

// ItemLocation
export interface IItemLocation {
  sku: string;
  quantity: number;
}

const ItemLocationSchema: Schema = new Schema({
  sku: { type: String, ref: "Item.sku", required: true },
  quantity: { type: Number, default: 0 },
});

// Location
export interface ILocation extends Document {
  address: string;
  city: string;
  state: string;
  country: string;
  country_code: string;
  phone: string;
  items: IItemLocation[];
}

const LocationSchema: Schema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  country_code: { type: String, required: true },
  phone: { type: String, required: true },
  items: { type: [ItemLocationSchema], default: [] },
});

/**
 * Calculates the sum of the given item's inventory for every location
 * @param sku to calculate the total
 */
ItemLocationSchema.statics.getTotalInventory = async function (sku: string) {
  const totalInventory = await this.aggregate([
    {
      $unwind: {
        path: "$items",
      },
    },
    {
      $project: {
        items: 1,
        sku: "$items.sku",
        quantity: "$items.quantity",
      },
    },
    {
      $group: {
        _id: "$sku",
        total: {
          $sum: "$quantity",
        },
      },
    },
    {
      $match: {
        _id: sku,
      },
    },
  ]);

  try {
    await Item.findOneAndUpdate({ sku }, { totalInventory });
  } catch (err) {
    console.error(err);
  }
};

ItemLocationSchema.post(
  "updateOne",
  async function (itemLocation: IItemLocation) {
    await this.constructor.getTotalInventory(itemLocation.sku);
  }
);

const Location: Model<ILocation> = model("Location", LocationSchema);

export default Location;
