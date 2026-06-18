import { socket } from "./socket";

import { EVENTS } from "./socketEvents";

export const joinRoom = ({
  roomId,
  userId,
  userName,
}) => {
  socket.emit(EVENTS.ROOM_JOIN, {
    roomId,
    userId,
    userName,
  });
};

export { socket };