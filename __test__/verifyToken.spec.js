const { expect } = require("chai");
const config = require("../src/config");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");
const verifyToken = require("../src/api/middlewares/verifyToken");

describe("VerifyToken middleware unit test", () => {
  it("If there is no authorization header, go to the error handler.", () => {
    const req = { headers: { authorization: null } };

    const nextSpy = sinon.spy();
    verifyToken(req, {}, nextSpy);

    expect(nextSpy.calledOnce).to.be.true;
    expect(nextSpy.calledWith(sinon.match.any)).to.be.true;
  });

  it("If there is an invalid JWT token in the authorization header, go to the error handler.", () => {
    const req = { headers: { authorization: "Bearer 12345667y" } };

    const nextSpy = sinon.spy();
    verifyToken(req, {}, nextSpy);

    expect(nextSpy.calledOnce).to.be.true;
    expect(nextSpy.calledWith(sinon.match.any)).to.be.true;
  });

  it("If the authentication type is not 'Bearer' in the authorization header, go to the error handler.", () => {
    const accessToken = jwt.sign(
      { name: "test", email: "test@gmail.com" },
      config.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    const req = { headers: { authorization: `Basic ${accessToken}` } };
    const nextSpy = sinon.spy();
    verifyToken(req, {}, nextSpy);

    expect(nextSpy.calledOnce).to.be.true;
    expect(nextSpy.calledWith(sinon.match.any)).to.be.true;
  });

  it("If there is a valid JWT token in the authorization header, go to the controller.", () => {
    const accessToken = jwt.sign(
      { name: "test", email: "test@gmail.com" },
      config.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    const req = { headers: { authorization: `Bearer ${accessToken}` } };

    const nextSpy = sinon.spy();
    verifyToken(req, {}, nextSpy);

    expect(nextSpy.calledOnce).to.be.true;
    expect(nextSpy.calledWith(sinon.match.any)).to.be.false;
  });
});
