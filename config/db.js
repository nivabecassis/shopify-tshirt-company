const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(`Attempting connection to ${process.env.MONGO_URI} ...`.blue);
  const result = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Mongo DB connected: ${result.connection.host}`.green.bold);
};

module.exports = connectDB;
