const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");

const {
  createInterviewController,
  getMyInterviewsController,
  getPendingInvitationsController,
  acceptInterviewController,
} = require("./interview.controller");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createInterviewController
);

router.get(
  "/invitations",
  authMiddleware,
  getPendingInvitationsController
);

router.post(
  "/:id/accept",
  authMiddleware,
  acceptInterviewController
);

router.get(
  "/",
  authMiddleware,
  getMyInterviewsController
);

module.exports = router;
