import { socket } from "./socket";

import { EVENTS } from "./socketEvents";

export const sendMessage = ({
  roomId,
  senderId,
  message,
}) => {
  socket.emit(
    EVENTS.CHAT_SEND,
    {
      roomId,
      senderId,
      message,
    }
  );
};

export const listenForMessages =
  (callback) => {
    socket.on(
      EVENTS.CHAT_MESSAGE,
      callback
    );
  };

export const removeMessageListener =
  (callback) => {
    socket.off(
      EVENTS.CHAT_MESSAGE,
      callback
    );
  };