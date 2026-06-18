const mongoose = require("mongoose");

const Interview = require("../interviews/interview.model");

const createHttpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const getRoomDetails = async (roomId, userId) => {
  if (!mongoose.isValidObjectId(roomId)) {
    throw createHttpError("Room Not Found", 404);
  }

  const interview = await Interview.findById(
    roomId
  )
    .populate("interviewer", "name")
    .populate("candidate", "name");

  if (!interview) {
    throw createHttpError("Room Not Found", 404);
  }

  const isInterviewer =
    interview.interviewer._id.toString() ===
    userId.toString();

  const isCandidate =
    interview.candidate?._id.toString() ===
    userId.toString();

  if (!isInterviewer && !isCandidate) {
    throw createHttpError(
      "You don't have access to this room.",
      403
    );
  }

  const role =
  interview.interviewer._id.toString() ===
  userId.toString()
    ? "interviewer"
    : "candidate";

  return {
  roomId: interview._id,
  title: interview.title,
  language: interview.language,
  difficulty: interview.difficulty,
  role,

  interviewer: {
    id: interview.interviewer._id,
    name: interview.interviewer.name,
  },

  candidate: interview.candidate
    ? {
        id: interview.candidate._id,
        name: interview.candidate.name,
      }
    : null,
};
};

module.exports = {
  getRoomDetails,
};
