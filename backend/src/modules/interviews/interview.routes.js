const express = require("express");

const authMiddleware = require("../../middleware/auth.middleware");

const {
  createInterviewController,
  getMyInterviewsController,
  getPendingInvitationsController,
  acceptInterviewController,
  endInterviewController,
  getInterviewResultController,
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
  "/:id/result",
  authMiddleware,
  getInterviewResultController
);

router.get(
  "/",
  authMiddleware,
  getMyInterviewsController
);



module.exports = router;
