const mongoose = require("mongoose");
const joi = require("joi");
const joigoose = require("joigoose")(mongoose);

const joiArticleSchema = joi.object({
  title: joi.string().required(),
  tag: joi
    .string()
    .meta({ _mongoose: { type: "ObjectId", ref: "Tag" } })
    .required(),
  contents: joi.string().allow("").default(""),
  previewContents: joi.string().allow("").default(""),
  lastVisitedSiteUrl: joi.string().required(),
  lastSavedTime: joi.date().default(new Date()),
});

const articleSchema = new mongoose.Schema(joigoose.convert(joiArticleSchema));

const Article = mongoose.model("Article", articleSchema);

module.exports = { Article, joiArticleSchema };
