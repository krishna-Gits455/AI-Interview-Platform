const Interview = require("./interview.model");

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
    interviewer: userId,
  }).sort({
    createdAt: -1,
  });

  return interviews;
};

module.exports = {
  createInterview,
  getMyInterviews,
};