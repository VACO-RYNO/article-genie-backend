const { Router } = require("express");
const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const verifyToken = require("../middlewares/verifyToken");
const validate = require("../middlewares/validateSchema");

const { joiArticleSchema } = require("../../models/Article");
const UserController = require("../controllers/user");

const route = Router();

module.exports = app => {
  app.use("/users", verifyToken, route);

  route.get(
    "/:user_id/sites",
    validate(joi.object({ user_id: joi.objectId().required() }), "params"),
    UserController.getVisitedSites,
  );
  route.post(
    "/:user_id/sites",
    validate(joi.object({ user_id: joi.objectId().required() }), "params"),
    validate(joi.object({ originUrl: joi.string().required() }), "body"),
    UserController.createVisitedSite,
  );

  route.get(
    "/:user_id/articles",
    validate(joi.object({ user_id: joi.objectId().required() }), "params"),
    UserController.getAllMyArticles,
  );
  route.get(
    "/:user_id/articles/:article_id",
    validate(
      joi.object({
        user_id: joi.objectId().required(),
        article_id: joi.objectId().required(),
      }),
      "params",
    ),
    UserController.getMyArticle,
  );

  route.post(
    "/:user_id/articles",
    validate(joi.object({ user_id: joi.objectId().required() }), "params"),
    validate(joiArticleSchema, "body"),
    UserController.createMyArticle,
  );

  route.delete(
    "/:user_id/articles/:article_id",
    validate(
      joi.object({
        user_id: joi.objectId().required(),
        article_id: joi.objectId().required(),
      }),
      "params",
    ),
    UserController.deleteMyArticle,
  );
  route.put(
    "/:user_id/articles/:article_id",
    validate(
      joi.object({
        user_id: joi.objectId().required(),
        article_id: joi.objectId().required(),
      }),
      "params",
    ),
    validate(joiArticleSchema, "body"),
    UserController.replaceMyArticle,
  );

  route.patch(
    "/:user_id/articles/:article_id",
    validate(
      joi.object({
        user_id: joi.objectId().required(),
        article_id: joi.objectId().required(),
      }),
      "params",
    ),
    validate(
      joi.object({
        lastVisitedSiteUrl: joi.string().uri().required(),
        lastVisitedSiteOgImgSrc: joi.string().optional().allow(null).allow(""),
      }),
      "body",
    ),
    UserController.updateMyArticle,
  );
};
