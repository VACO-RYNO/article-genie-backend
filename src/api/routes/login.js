const { Router } = require("express");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/index");

const User = require("../../models/User");
const { catchAsync } = require("../../utils/asyncHandler");

const route = Router();

module.exports = app => {
  app.use("/login", route);

  route.post(
    "/",
    catchAsync(async (req, res, next) => {
      const { name, email } = req.body;

      if (!name || !email) {
        return next(createError(401));
      }

      let userData = await User.findOne({ email });

      if (!userData) {
        userData = await User.create({ ...req.body });
      }

      const userPayload = {
        name: userData.name,
        email: userData.email,
      };

      const accessToken = jwt.sign(userPayload, JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.json({
        result: "ok",
        data: {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          profileImageUrl: userData.profileImageUrl,
          recentlyVisitedSites: userData.recentlyVisitedSites,
          myArticles: userData.myArticles,
        },
        accessToken: accessToken,
      });
    }),
  );
};
