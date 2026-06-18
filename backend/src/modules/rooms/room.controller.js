const {
  getRoomDetails,
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

module.exports = {
  getRoomDetailsController,
};
