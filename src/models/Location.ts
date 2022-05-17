import { Types, Schema, Model, model, Document } from "mongoose";

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

const Location: Model<ILocation> = model("Location", LocationSchema);

export default Location;
