const { Router } = require("express");
const path = require("path");
const route = Router();

module.exports = app => {
  app.use("/static", route);

  route.get("/css", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../../public/stylesheets", "style.css"));
  });

  route.get("/javascript", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../../public/javascript", "index.js"));
  });
};
