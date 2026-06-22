const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");
const {
  getRoomDetailsController,
  getEditorStateController,
  saveEditorStateController,
} = require("./room.controller");

const router = express.Router();

router.get(
  "/:roomId",
  authMiddleware,
  getRoomDetailsController
);
router.get(
  "/:roomId/editor-state",
  authMiddleware,
  getEditorStateController
);

router.put(
  "/:roomId/editor-state",
  authMiddleware,
  saveEditorStateController
);
module.exports = router;
