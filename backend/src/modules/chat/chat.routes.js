const express = require("express");

const authMiddleware = require(
  "../../middleware/auth.middleware"
);

const {
  getMessagesController,
} = require("./chat.controller");

const router = express.Router();

router.get(
  "/:roomId",
  authMiddleware,
  getMessagesController
);

module.exports = router;