const express = require("express");
const app = express();
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/user");
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
