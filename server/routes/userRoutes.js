const express = require("express");
const router = express.Router();
const {
  LoginController,
  SignupController,
  SaveUserController
} = require("../controllers/userController");

router.post("/login", LoginController);
router.post("/signup", SignupController);
router.post("/saveUser", SaveUserController);

module.exports = router;
