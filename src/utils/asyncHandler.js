const Logger = require("../loaders/logger");

const catchAsync = (asyncFunction) => {
  return async (req, res, next) => {
    try {
      await asyncFunction(req, res, next);
    } catch (error) {
      Logger.error(error);
      next(error);
    }
  };
};

exports.catchAsync = catchAsync;
