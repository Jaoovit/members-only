const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// Users Routes
router.get("/sign-up", userController.getSignUpForm);
router.post("/sign-up", userController.postNewUser);

module.exports = router;
