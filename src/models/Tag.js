const mongoose = require("mongoose");
const joi = require("joi");
const joigoose = require("joigoose")(mongoose);

const joiTagSchema = joi.object({
  name: joi.string().required(),
});

const tagSchema = new mongoose.Schema(joigoose.convert(joiTagSchema));

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
