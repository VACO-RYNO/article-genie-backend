const { Router } = require("express");
const morganMiddleware = require("./middlewares/morganMiddleware");

module.exports = () => {
  const app = Router();

  app.use(morganMiddleware);

  return app;
};
