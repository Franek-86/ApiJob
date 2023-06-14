const bcrypt = require("bcryptjs");
const {
  NotFound,
  Unauthorized,
  CustomError,
  BadRequest,
} = require("../errors");
const user = require("../models/user");
const loginUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email) {
    throw new BadRequest("please provide email");
  }
  if (!name) {
    throw new BadRequest("please provide name");
  }
  const loggedUser = await user.findOne({ email: email, name: name });
  if (loggedUser) {
    const checkPassword = await loggedUser.comparePassword(password);
    if (checkPassword) {
      const token = loggedUser.createJWT();

      // next(token);
      console.log(req.body);
      // req.body = token;
      res.json({ name, token });
    } else {
      throw new Unauthorized("wrong authentication");
    }
  } else {
    throw new NotFound("there is not such user");
  }
};
const registerUser = async (req, res, next) => {
  const { name } = req.body;
  const test = await user.create({ ...req.body });
  const token = test.createJWT();
  if (test) {
    res.json({ user: name, token });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
