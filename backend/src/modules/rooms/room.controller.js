const {
  getRoomDetails,
  getEditorState,
  saveEditorState,
} = require("./room.service");

const getRoomDetailsController = async (
  req,
  res,
  next
) => {
  try {
    const room = await getRoomDetails(
      req.params.roomId,
      req.user._id
    );

    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

const getEditorStateController =
  async (req, res, next) => {
    try {
      const state =
        await getEditorState(
          req.params.roomId
        );

      res.status(200).json(state);
    } catch (error) {
      next(error);
    }
  };

const saveEditorStateController =
  async (req, res, next) => {
    try {
      const { code, language } =
        req.body;

      const state =
        await saveEditorState(
          req.params.roomId,
          code,
          language
        );

      res.status(200).json(
  state
);
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  getRoomDetailsController,
  getEditorStateController,
  saveEditorStateController,
};
