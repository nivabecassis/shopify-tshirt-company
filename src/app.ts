import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import "colors";

import connectDB from "./config/db";
import itemsRouter from "./routes/items";
import usersRouter from "./routes/users";
import errorHandler from "./middleware/error";

// Load env configs
const result = dotenv.config({ path: "./src/config/config.env" });
if (result.error) {
  throw new Error(result.error.message);
}

// Connect to the db
connectDB();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "dev") {
  app.use(logger("combined"));
}

// Routes
app.use("/items", itemsRouter);
app.use("/users", usersRouter);

// Set express' static folder
app.use(express.static(path.join(__dirname, "public")));

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  )
);

// Handle unhandled promises and crash server
process.on("unhandledRejection", (err: Error, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close((err) => process.exit(1));
});

module.exports = app;
