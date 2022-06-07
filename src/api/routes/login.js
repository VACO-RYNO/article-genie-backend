const { Router } = require("express");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const config = require("../../config");
const { catchAsync } = require("../../utils/asyncHandler");
const validate = require("../middlewares/validateSchema");

const { User, joiUserSchema } = require("../../models/User");

const route = Router();

module.exports = app => {
  app.use("/login", route);

  route.post(
    "/",
    validate(joiUserSchema, "body"),
    catchAsync(async (req, res, next) => {
      const { name, email, imageUrl } = req.body;

      if (!name || !email) {
        return next(createError(401));
      }

      let userData = await User.findOne({ email });

      if (!userData) {
        userData = await User.create({
          name,
          email,
          profileImageUrl: imageUrl,
        });
      }

      const userPayload = {
        name: userData.name,
        email: userData.email,
      };

      const accessToken = jwt.sign(userPayload, config.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.json({
        result: "ok",
        data: {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          profileImageUrl: userData.profileImageUrl,
        },
        accessToken: accessToken,
      });
    }),
  );
};
