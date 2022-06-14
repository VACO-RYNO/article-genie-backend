const { Router } = require("express");

const validate = require("../middlewares/validateSchema");
const { joiUserSchema } = require("../../models/User");
const AuthController = require("../controllers/auth");

const route = Router();

module.exports = app => {
  app.use("/login", route);

  route.post("/", validate(joiUserSchema, "body"), AuthController.login);
};
