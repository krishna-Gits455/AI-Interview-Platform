const {
  runCodeSchema,
} = require("./execution.validation");

const {
  runCode,
} = require("./execution.service");

const runCodeController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const {
        language,
        code,
      } =
        runCodeSchema.parse(
          req.body
        );

      const result =
        await runCode(
          req.body.roomId,
          req.user._id,
          language,
          code
        );

      res.status(200).json({
        success: true,
        result,
      });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  runCodeController,
};