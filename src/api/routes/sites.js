const { Router } = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const Joi = require("joi");

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

      if (error) {
        next(error);
      } else {
        next();
      }
    },
    async (req, res, next) => {
      try {
        const { originUrl } = req.body;
        const response = await axios.get(originUrl);
        const document = cheerio.load(response.data);

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

        document("ul")
          .find("li")
          .each((index, item) => (item.tagName = "section"));
        document("ul").each((index, item) => (item.tagName = "article"));
        document("b").each((index, item) => (item.tagName = "strong"));

        res.send(document.html());
      } catch (err) {
        next(err);
      }
    }),
  );
};
