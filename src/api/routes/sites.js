const { Router } = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const Joi = require("joi");

const { catchAsync } = require("../../utils/asyncHandler");

const route = Router();

module.exports = app => {
  app.use("/sites", route);

  route.post(
    "/",
    ((req, res, next) => {
      const schema = Joi.object({
        originUrl: Joi.string().required(),
      });

      const { error } = schema.validate(req.body);

      if (error) return next(error);

      next();
    },
    catchAsync(async (req, res, next) => {
      const { originUrl } = req.body;
      const { data } = await axios.get(originUrl);
      const document = cheerio.load(data);

      document("head").append(`
      <style>
        p:hover {
          background-color: #fcddec;
          border-radius: 5px;
          box-shadow: #fcddec 0px 0px 0px 2px;
        }
        .hover {
          background-color: #fcddec;
          border-radius: 5px;
          box-shadow: #fcddec 0px 0px 0px 2px;
        }
      </style>`);

      document("div").each((index, item) => (item.tagName = "section"));
      document("ul").each((index, item) => (item.tagName = "nav"));
      document("ol").each((index, item) => (item.tagName = "nav"));
      document("b").each((index, item) => (item.tagName = "strong"));

      return document.html();
    })),
  );
};
