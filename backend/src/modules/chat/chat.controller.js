const {
  getMessages,
} = require("./chat.service");

const getMessagesController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const messages =
        await getMessages(
          req.params.roomId,
          req.user._id
        );

      res.json({
        success: true,
        messages,
      });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  getMessagesController,
};