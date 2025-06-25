const express = require("express");
const router = express.Router();
const {
  LoginController,
  SignupController,
} = require("../controllers/userController");

router.post("/login", LoginController);
router.post("/signup", SignupController);

module.exports = router;
