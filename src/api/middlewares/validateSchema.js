const createError = require("http-errors");

module.exports = function validate(schema, property) {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    if (error) {
      next(createError(401));
    }

    next();
  };
};
