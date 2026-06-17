const {
  createInterviewSchema,
} = require("./interview.validation");

const {
  createInterview,
} = require("./interview.service");

const {
  getMyInterviews,
} = require("./interview.service");

const createInterviewController = async (
  req,
  res,
  next
) => {
  try {
    const data =
      createInterviewSchema.parse(req.body);

    const interview =
      await createInterview({
        ...data,
        interviewerId: req.user._id,
      });

    res.status(201).json({
      success: true,
      message:
        "Interview created successfully",
      interview,
    });
  } catch (error) {
    next(error);
  }
};

const getMyInterviewsController = async (
  req,
  res,
  next
) => {
  try {
    const interviews =
      await getMyInterviews(req.user._id);

    res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInterviewController,
  getMyInterviewsController,
};