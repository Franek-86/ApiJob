const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide password"],
    },
  },
  { timestamps: true }
);

userSchema.methods.createJWT = function () {
  const name = this.name;
  const userId = this._id;
  const token = jwt.sign({ userId, name }, process.env.SECRET_KEY, {
    expiresIn: "31d",
  });
  return token;
};
userSchema.methods.comparePassword = async function (compare) {
  const checkPassword = await bcrypt.compare(compare, this.password);
  return checkPassword;
};
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const test = await bcrypt.hash(this.password, salt);
  this.password = test;
});

module.exports = mongoose.model("user", userSchema);
