const { Router } = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const Joi = require("joi");

const { catchAsync } = require("../../utils/asyncHandler");

const { User } = require("../../models/User");

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

      document("head").append(
        `<link rel="stylesheet" href="http://localhost:8000/api/static/css">`,
      );

      document("body").append(
        `<div id="hover-modal">
          <button class="modal-button" id="link">링크 생성</button>
          <button class="modal-button" id="memo">메모</button>
        </div>`,
      );

      document("p").attr(
        "onMouseOver",
        `const hoverModal = document.querySelector("#hover-modal");
        hoverModal.classList.add("show");
        hoverModal.style.left = window.event.clientX - 50 + "px";
        hoverModal.style.top = this.offsetTop + 190 + "px";
        `,
      );

      document("div").each((index, item) => (item.tagName = "section"));
      document("ul").each((index, item) => (item.tagName = "nav"));
      document("ol").each((index, item) => (item.tagName = "nav"));
      document("b").each((index, item) => (item.tagName = "strong"));

      if (!req.user) return res.send(document.html());

      const user = await User.findOne({ _id: req.user.id });

      user.recentlyVisitedSites = [
        originUrl,
        ...user.recentlyVisitedSites
          .filter(existedUrl => existedUrl !== originUrl)
          .slice(0, 9),
      ];

      await user.save();

      return document.html();
    })),
  );
};
