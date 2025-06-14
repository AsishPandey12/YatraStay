const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/user");

router.get("/signup", userController.renderSignupForm);

// Signup user
router.post("/signup", wrapAsync(userController.signup));

router.get("/login", userController.renderLoginForm);

// Login user
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

// Logout user
router.get("/logout", userController.logout);

module.exports = router;
