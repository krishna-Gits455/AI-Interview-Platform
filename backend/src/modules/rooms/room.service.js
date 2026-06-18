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
  ).populate("interviewer", "name");

  if (!interview) {
    throw createHttpError("Room Not Found", 404);
  }

  if (
    interview.interviewer._id.toString() !==
    userId.toString()
  ) {
    throw createHttpError(
      "You don't have access to this room.",
      403
    );
  }

  return {
    roomId: interview._id,
    title: interview.title,
    language: interview.language,
    difficulty: interview.difficulty,
    interviewer: {
      id: interview.interviewer._id,
      name: interview.interviewer.name,
    },
  };
};

module.exports = {
  getRoomDetails,
};
