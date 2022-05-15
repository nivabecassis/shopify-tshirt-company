import { Document, Schema, Model, model } from "mongoose";

interface ItemQuantity extends Document {
  sku: string;
  quantity: number;
}

interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  country_code: string;
  phone: string;
  items: Map<string, number>;
}

const LocationSchema: Schema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  country_code: { type: String, required: true },
  phone: { type: String, required: true },
  items: { type: Map, of: Number, required: false },
});

const Location: Model<Location> = model("Location", LocationSchema);
