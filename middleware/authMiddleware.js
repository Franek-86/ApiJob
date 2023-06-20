const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Unauthorized } = require("../errors");
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const test = jwt.verify(token, process.env.SECRET_KEY);
    const { userId, name } = test;
    req.body.userId = userId;

    next();
  } else {
    throw new Unauthorized("not authorized");
  }
};
module.exports = authMiddleware;
