import { connect } from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("Missing value for MONGO_URI");
  }

  const result = await connect(process.env.MONGO_URI);
  console.log(`Mongo DB connected: ${result.connection.host}`.green.bold);
};

export default connectDB;
