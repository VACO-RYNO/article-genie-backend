const { Router } = require("express");

const route = Router();

module.exports = (app) => {
  app.use("/sites", route);

  route.post("/", (req, res, next) => {});
};
