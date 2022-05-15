"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("colors");
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB = require("./config/db");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
// Load env configs
dotenv_1.default.config({ path: "./config/config.env" });
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
app.use("/", indexRouter);
app.use("/users", usersRouter);
// Set express' static folder
app.use(express.static(path.join(__dirname, "public")));
// TODO add middleware for errors
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
    .bold));
// Handle unhandled promises and crash server
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close((err) => process.exit(1));
});
module.exports = app;
