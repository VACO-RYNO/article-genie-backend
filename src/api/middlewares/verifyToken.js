const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const config = require("../../config");

function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return next(createError(401));
  }

  if (authToken.split(" ")[0] !== "Bearer") {
    return next(createError(401));
  }

  const accessToken = authToken.split(" ")[1];

  const verifiedUserData = jwt.verify(
    accessToken,
    config.JWT_SECRET,
    (error, payload) => {
      if (error) {
        return null;
      }

      return payload;
    },
  );

  if (!verifiedUserData) {
    return next(createError(401));
  }

  req.user = verifiedUserData;

  next();
}

module.exports = verifyToken;
