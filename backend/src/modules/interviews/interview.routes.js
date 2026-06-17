const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");

const {
  createInterviewController,
  getMyInterviewsController,
} = require("./interview.controller");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createInterviewController
);

router.get(
  "/",
  authMiddleware,
  getMyInterviewsController
);

module.exports = router;