import "colors";
import fs from "fs";
import dotenv from "dotenv";

import connectDB from "./src/config/db";
import Item from "./src/models/Item";
import Location from "./src/models/Location";

const result = dotenv.config({ path: "./src/config/config.env" });
if (result.error) {
  throw new Error(result.error.message);
}

// Connect to the db
connectDB();

const items = JSON.parse(
  fs.readFileSync(`${__dirname}/data/items.json`, "utf-8")
);
const locations = JSON.parse(
  fs.readFileSync(`${__dirname}/data/locations.json`, "utf-8")
);

const create = async () => {
  try {
    await Item.create(items);
    await Location.create(locations);
    console.log("Created data".green);
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

const deleteAll = async () => {
  try {
    await Item.deleteMany();
    await Location.deleteMany();
    console.log("Deleted all the data".green);
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

const dataInstruction = process.argv[2];
if (dataInstruction === "-c") {
  create();
} else if (dataInstruction === "-d") {
  deleteAll();
}
