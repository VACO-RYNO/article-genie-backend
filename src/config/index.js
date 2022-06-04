const dotenv = require("dotenv");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

module.exports = {
  DATABASE_URL: process.env.MONGODB_URI,

  JWT_SECRET: process.env.JWT_SECRET,
};
