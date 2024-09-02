const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// Users Routes
router.get("/sign-up", userController.getSignUpForm);
router.get("/sign-in", userController.getSignInForm);
router.post("/sign-up", userController.postNewUser);
router.post("/sign-in", userController.userAuthenticate);
router.get("/", userController.getHomepage);
router.get("/logout", userController.userLogout);

module.exports = router;
