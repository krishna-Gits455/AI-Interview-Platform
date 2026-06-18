const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");
const {
  getRoomDetailsController,
} = require("./room.controller");

const router = express.Router();

router.get(
  "/:roomId",
  authMiddleware,
  getRoomDetailsController
);

module.exports = router;
