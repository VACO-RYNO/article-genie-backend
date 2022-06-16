const createError = require("http-errors");
const Logger = require("../../loaders/logger");

module.exports = function validate(schema, property) {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    if (error) {
      next(createError(400));
      Logger.error(error);
    }

    next();
  };
};
