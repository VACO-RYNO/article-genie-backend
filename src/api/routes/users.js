const { Router } = require("express");

const route = Router();

module.exports = (app) => {
  app.use("/users", route);

  route.get("/:user_id/sites", (req, res, next) => {});

  route.get("/:user_id/articles", (req, res, next) => {});
  route.post("/:user_id/articles/", (req, res, next) => {});
  route.delete("/:user_id/articles/:article_id", (req, res, next) => {});
  route.put("/:user_id/articles/:article_id", (req, res, next) => {});
  route.patch("/:user_id/articles/:article_id", (req, res, next) => {});
};
