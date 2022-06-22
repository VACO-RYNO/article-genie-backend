const httpMocks = require("node-mocks-http");
const mockReq = httpMocks.createRequest();
const mockRes = httpMocks.createResponse();
const { expect } = require("chai");
const auth = require("../src/api/controllers/auth");
const mongooseLoader = require("../src/loaders/mongoose");
const { User } = require("../src/models/User");

mockReq.body = {
  name: "testMan",
  email: "test@example.com",
};

before(async () => {
  await mongooseLoader();
  await User.create({
    name: "testMan",
    email: "test@example.com",
  });
});

after(async () => {
  await User.findOneAndDelete({
    email: "test@example.com",
  });
});

describe("login endpoint unit test", () => {
  it("login data response", async () => {
    await auth.login(mockReq, mockRes);

    const result = JSON.parse(mockRes._getData());

    expect(result).to.have.own.property("accessToken");

    const { data } = result;

    expect(data).to.own.include({ email: "test@example.com" });
  });
});
