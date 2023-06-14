const jwt = require("jsonwebtoken");

const { Unauthorized } = require("../errors");
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    const test = jwt.verify(token, "secret");
    const { userId, name } = test;
    req.body.userId = userId;
    next();
  } else {
    throw new Unauthorized("not authorized");
  }
};
module.exports = authMiddleware;
