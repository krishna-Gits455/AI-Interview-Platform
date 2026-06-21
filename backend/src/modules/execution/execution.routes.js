const express = require(
  "express"
);

const authMiddleware =
  require("../../middleware/auth.middleware");

const {
  runCodeController,
} = require("./execution.controller");

const router =
  express.Router();

router.post(
  "/run",
  authMiddleware,
  runCodeController
);

module.exports = router;