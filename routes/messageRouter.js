const express = require("express");
const messageController = require("../controllers/messageController");
const router = express();

router.post("/", messageController.postNewMessage);

module.exports = router;
