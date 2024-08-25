const express = require("express");
const router = express.Router();
const groupController = require("../../controller/group/groupController");
const { verifyToken } = require("../../middleware/auth/authMiddleware");

router.post("/", verifyToken, groupController.createGroup);
router.post(
  "/:groupId/messages",
  verifyToken,
  groupController.sendGroupMessage
);

module.exports = router;
