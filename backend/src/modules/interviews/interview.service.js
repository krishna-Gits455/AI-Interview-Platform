const mongoose = require("mongoose");

const Interview = require("./interview.model");

const createHttpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const createInterview = async ({
  title,
  candidateEmail,
  language,
  difficulty,
  scheduledAt,
  interviewerId,
}) => {
  const interview = await Interview.create({
    title,
    candidateEmail,
    language,
    difficulty,
    scheduledAt,
    interviewer: interviewerId,
  });

  return interview;
};

const getMyInterviews = async (userId) => {
  const interviews = await Interview.find({
    $or: [
      { interviewer: userId },
      { candidate: userId },
    ],
  }).sort({
    createdAt: -1,
  });

  return interviews;
};

const getPendingInvitations = async (
  userEmail
) => {
  const invitations = await Interview.find({
    candidateEmail: userEmail,
    candidate: null,
  })
    .populate("interviewer", "name email")
    .sort({ createdAt: -1 });

  return invitations;
};

const acceptInterview = async (
  interviewId,
  user
) => {
  if (!mongoose.isValidObjectId(interviewId)) {
    throw createHttpError(
      "Interview not found",
      404
    );
  }

  const interview =
    await Interview.findById(interviewId);

  if (!interview) {
    throw createHttpError(
      "Interview not found",
      404
    );
  }

  if (interview.candidateEmail !== user.email) {
    throw createHttpError(
      "You don't have access to this invitation.",
      403
    );
  }

  if (interview.candidate) {
    throw createHttpError(
      "Interview already claimed",
      409
    );
  }

  interview.candidate = user._id;
  interview.status = "Scheduled";

  await interview.save();

  return interview;
};

module.exports = {
  createInterview,
  getMyInterviews,
  getPendingInvitations,
  acceptInterview,
};
