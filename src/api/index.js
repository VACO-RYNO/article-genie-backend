const { Router } = require("express");

const morganMiddleware = require("./middlewares/morganMiddleware");

const login = require("./routes/login");
const sites = require("./routes/sites");
const users = require("./routes/users");

module.exports = () => {
  const app = Router();

  app.use(morganMiddleware);

  login(app);
  sites(app);
  users(app);

  return app;
};
