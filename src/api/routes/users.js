const { Router } = require("express");
const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const { catchAsync } = require("../../utils/asyncHandler");
const verifyToken = require("../middlewares/verifyToken");
const validate = require("../middlewares/validateSchema");

const { User } = require("../../models/User");

const route = Router();

module.exports = app => {
  app.use("/users", verifyToken, route);

  route.get(
    "/:user_id/sites",
    validate(joi.object({ user_id: joi.objectId().required() }), "params"),
    catchAsync(async (req, res, next) => {
      const { user_id } = req.params;

      const userData = await User.findOne({ _id: user_id }).lean();

      return res.json({
        result: "ok",
        data: {
          recentlyVisitedSites: userData.recentlyVisitedSites,
        },
      });
    }),
  );

  route.get("/:user_id/articles", (req, res, next) => {});
  route.post("/:user_id/articles", (req, res, next) => {});
  route.delete("/:user_id/articles/:article_id", (req, res, next) => {});
  route.put("/:user_id/articles/:article_id", (req, res, next) => {});
  route.patch("/:user_id/articles/:article_id", (req, res, next) => {});
};
