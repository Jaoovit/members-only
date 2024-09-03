const express = require("express");
const messageController = require("../controllers/messageController");
const router = express();

router.post("/", messageController.postNewMessage);
router.post("/delete/:id", messageController.deleteMessageById);

module.exports = router;
