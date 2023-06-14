const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../errors");

const errorHandler = (err, req, res, next) => {
  const errorObj = {
    message: "something went wrong",
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  };
  if (err.name && err.name === "ValidationError") {
    const test = Object.keys(err.errors)
      .map((i) => {
        return `please provide ${i}`;
      })
      .join(",");
    errorObj.message = test;
    errorObj.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.code === 11000) {
    errorObj.message = `there is already a user with the email of ${Object.values(
      err.keyValue
    )}`;
    errorObj.statusCode = StatusCodes.BAD_REQUEST;
  }
  res.status(errorObj.statusCode).json({ error: errorObj.message });
  // res.json({ err });
};

module.exports = errorHandler;
