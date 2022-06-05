const mongoose = require("mongoose");
const joi = require("joi");
const joigoose = require("joigoose")(mongoose);

const joiUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  profileImageUrl: joi.string().uri(),
  recentlyVisitedSites: joi.array().items(joi.string().uri()),
  myArticles: joi.array().items(
    joi.string().meta({
      _mongoose: { type: "ObjectId", ref: "Article" },
    }),
  ),
});

const userSchema = new mongoose.Schema(joigoose.convert(joiUserSchema));

const User = mongoose.model("User", userSchema);

module.exports = User;
