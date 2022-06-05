const express = require("express");
const cors = require("cors");
const routes = require("../api");
const { errorHandler } = require("../api/middlewares/errorHandler");

module.exports = app => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  app.use(routes());

  app.use(function (req, res, next) {
    res.sendStatus(404);
  });

  app.use(errorHandler);
};
