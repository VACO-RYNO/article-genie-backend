const morgan = require("morgan");
const Logger = require("../../loaders/logger");

const stream = {
  write: (message) => Logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";

  return env !== "development";
};

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

module.exports = morganMiddleware;
