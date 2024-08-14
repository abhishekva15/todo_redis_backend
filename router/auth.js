// const express = require('express');
// const router = express.Router();

// const {registerUser, loginUser} =require("../controller/register")
// const {signupValidation, loginValidation}= require("../middlewares/AuthValidation")

// router.post("/register", signupValidation, registerUser);
// router.post("/login",loginValidation, loginUser)

// module.exports = router;

const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controller/register");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/AuthValidation");

router.post("/register", signupValidation, registerUser);
router.post("/login", loginValidation, loginUser);

module.exports = router;
