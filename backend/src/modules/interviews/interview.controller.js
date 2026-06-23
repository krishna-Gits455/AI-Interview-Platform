const {
  createInterviewSchema,
  endInterviewSchema,
} = require(
  "./interview.validation"
);



const {
  createInterview,
  getMyInterviews,
  getPendingInvitations,
  acceptInterview,
  endInterview,
  getInterviewResult,
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

const getPendingInvitationsController = async (
  req,
  res,
  next
) => {
  try {
    const invitations =
      await getPendingInvitations(
        req.user.email
      );

    res.status(200).json({
      success: true,
      invitations,
    });
  } catch (error) {
    next(error);
  }
};

const acceptInterviewController = async (
  req,
  res,
  next
) => {
  try {
    const interview = await acceptInterview(
      req.params.id,
      req.user
    );

    res.status(200).json({
      success: true,
      message:
        "Invitation accepted successfully",
      interview,
    });
  } catch (error) {
    next(error);
  }
};

const endInterviewController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const data =
        endInterviewSchema.parse(
          req.body
        );

      const interview =
        await endInterview({
          interviewId:
            req.params.id,

          interviewerId:
            req.user._id,

          ...data,
        });

      res.status(200).json({
        success: true,
        interview,
      });
    } catch (error) {
      next(error);
    }
  };

  const getInterviewResultController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const interview =
        await getInterviewResult(
          req.params.id,
          req.user._id
        );

      res.status(200).json({
        success: true,
        interview,
      });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  createInterviewController,
  getMyInterviewsController,
  getPendingInvitationsController,
  acceptInterviewController,
  endInterviewController,
  getInterviewResultController,
};