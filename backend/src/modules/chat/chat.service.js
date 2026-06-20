const Chat = require("./chat.model");
const { getRoomDetails } = require("../rooms/room.service");

const createHttpError = (
  message,
  statusCode
) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const getMessages = async (
  roomId,
  userId
) => {
  await getRoomDetails(
    roomId,
    userId
  );

  return Chat.find({
    roomId,
  })
    .populate("sender", "name")
    .sort({ createdAt: 1 });
};

const createMessage = async ({
  roomId,
  senderId,
  message,
}) => {
  if (!message?.trim()) {
    throw createHttpError(
      "Message cannot be empty",
      400
    );
  }

  const chat = await Chat.create({
    roomId,
    sender: senderId,
    message,
  });

  return Chat.findById(chat._id)
    .populate("sender", "name");
};

module.exports = {
  getMessages,
  createMessage,
};