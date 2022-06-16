const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const { startSession } = require("mongoose");

const { catchAsync } = require("../../utils/asyncHandler");

const { User } = require("../../models/User");
const { Article } = require("../../models/Article");
const Tag = require("../../models/Tag");

exports.getVisitedSites = catchAsync(async (req, res, next) => {
  const { user_id } = req.params;

  const userData = await User.findOne({ _id: user_id }).lean();

  return res.json({
    result: "ok",
    data: {
      recentlyVisitedSites: userData.recentlyVisitedSites,
    },
  });
});

exports.createVisitedSite = catchAsync(async (req, res, next) => {
  const { user_id } = req.params;
  const { originUrl } = req.body;

  const user = await User.findOne({ _id: user_id });

  user.recentlyVisitedSites = [
    originUrl,
    ...user.recentlyVisitedSites
      .filter(existedUrl => existedUrl !== originUrl)
      .slice(0, 9),
  ];

  await user.save();

  return res.status(201).json({ result: "ok", data: { ...user.toObject() } });
});

exports.getAllMyArticles = catchAsync(async (req, res, next) => {
  const { user_id } = req.params;
  const session = await startSession();
  let userArticles = [];

  await session.withTransaction(async () => {
    const userData = await User.findOne({ _id: user_id }, null, {
      session,
    })
      .populate("myArticles")
      .lean();

    for (const article of userData.myArticles) {
      article.tag = await Tag.findOne({ _id: article.tag }, null, {
        session,
      }).lean();

      delete article.__v;
    }

    userArticles = userData.myArticles;
  });

  session.endSession();

  return res.status(200).json({ result: "ok", data: [...userArticles] });
});

exports.getMyArticle = catchAsync(async (req, res, next) => {
  const { article_id } = req.params;

  const userArticle = await Article.findOne({ _id: article_id }).lean();

  delete userArticle.__v;

  return res.status(200).json({ result: "ok", data: { ...userArticle } });
});

exports.createMyArticle = catchAsync(async (req, res, next) => {
  const { user_id } = req.params;
  const { title, tag, lastVisitedSiteUrl } = req.body;
  const session = await startSession();
  let newArticle = {};

  await session.withTransaction(async () => {
    const { _id: tagId } = await Tag.findOne({ name: tag }, null, {
      session,
    }).lean();

    const newArticleArr = await Article.create(
      [
        {
          title,
          tag: tagId,
          lastVisitedSiteUrl,
        },
      ],
      { session },
    );
    newArticle = newArticleArr[0].toObject();
    delete newArticle.__v;

    await User.updateOne(
      { _id: user_id },
      { $push: { myArticles: newArticle._id } },
      { session },
    );
  });

  session.endSession();

  return res.status(201).json({ result: "ok", data: { ...newArticle } });
});

exports.deleteMyArticle = catchAsync(async (req, res, next) => {
  const { user_id, article_id } = req.params;
  const session = await startSession();

  await session.withTransaction(async () => {
    await User.updateOne(
      { _id: user_id },
      { $pull: { myArticles: article_id } },
    );

    await Article.findByIdAndDelete(article_id);
  });

  session.endSession();

  return res.status(200).json({ result: "ok" });
});

exports.replaceMyArticle = catchAsync(async (req, res, next) => {
  const { article_id } = req.params;

  await Article.findOneAndReplace(
    { _id: article_id },
    { ...req.body },
    { new: true },
  );

  return res.status(201).json({
    result: "ok",
  });
});

exports.updateMyArticle = catchAsync(async (req, res, next) => {
  const { article_id } = req.params;
  const { lastVisitedSiteUrl, lastVisitedSiteOgImgSrc } = req.body;

  await Article.findByIdAndUpdate(
    article_id,
    { lastVisitedSiteUrl, lastVisitedSiteOgImgSrc },
    { new: true },
  );

  return res.status(200).json({
    result: "ok",
  });
});
