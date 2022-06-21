const httpMocks = require("node-mocks-http");
const mockReq = httpMocks.createRequest();
const mockRes = httpMocks.createResponse();
const { expect } = require("chai");

const mongooseLoader = require("../src/loaders/mongoose");
const { User } = require("../src/models/User");
const { Article } = require("../src/models/Article");
const UserController = require("../src/api/controllers/user");

let userId = "62b2fca805bdece5c2b78dc0";
let articleId;

mockReq.body = {
  title: "test article title",
  tag: "62a18539b6d0ca1143a300b1",
  contents: "test contents",
  previewContents: "test...",
  lastVisitedSiteUrl:
    "https://nextjs.org/learn/foundations/about-nextjs/what-is-nextjs",
};

mockReq.params = {
  user_id: userId,
};

before(async () => {
  await mongooseLoader();

  const newArticle = await Article.create(mockReq.body);

  articleId = newArticle._id;

  await User.updateOne({ _id: userId }, { $push: { myArticles: articleId } });
});

after(async () => {
  await Article.findOneAndDelete({ _id: articleId });

  await User.updateOne({ _id: userId }, { $pull: { myArticles: articleId } });
});

describe("/users/:user_id/articles endpoint unit test", () => {
  it("UserController.getAllMyArticles", async () => {
    await UserController.getAllMyArticles(mockReq, mockRes);

    const response = JSON.parse(mockRes._getData());

    expect(mockRes.statusCode).to.equal(200);
    expect(response).to.have.own.include({ result: "ok" });

    const { data } = response;
    expect(data[data.length - 1]).to.own.include({
      title: "test article title",
    });
  });
});
