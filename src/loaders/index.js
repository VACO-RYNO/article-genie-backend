const expressLoader = require("./express");
const Logger = require("./logger");
const mongooseLoader = require("./mongoose");

module.exports = async ({ expressApp }) => {
  await mongooseLoader();
  Logger.info(" ✅  MongoDB loaded and connected!");

  await expressLoader(expressApp);
  Logger.info(" 🟢  Express loaded");
};
