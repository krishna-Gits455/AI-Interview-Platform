const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");

const {
  createInterviewController,
  getMyInterviewsController,
  getPendingInvitationsController,
  acceptInterviewController,
  endInterviewController,
} = require(
  "./interview.controller"
);

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

router.post(
  "/:id/end",
  authMiddleware,
  endInterviewController
);

router.get(
  "/",
  authMiddleware,
  getMyInterviewsController
);



module.exports = router;
