const express = require("express");
const router = express.Router();
const messageController = require("../../controller/message/messageController");
const { verifyToken } = require("../../middleware/auth/authMiddleware");

router.post("/", verifyToken, messageController.sendMessage);
router.get("/history", verifyToken, messageController.getMessageHistory);

module.exports = router;
