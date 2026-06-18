const EVENTS = require("./socketEvents");

const roomParticipants =
  new Map();

const registerRoomHandlers = (
  io,
  socket
) => {
  socket.on(
    EVENTS.ROOM_JOIN,
    ({ roomId, userId, userName }) => {
      socket.join(roomId);

      if (
        !roomParticipants.has(roomId)
      ) {
        roomParticipants.set(
          roomId,
          []
        );
      }

      const participants =
        roomParticipants.get(roomId);

      const alreadyExists =
        participants.find(
          (p) => p.userId === userId
        );

      if (!alreadyExists) {
        participants.push({
          socketId: socket.id,
          userId,
          userName,
        });
      }

      io.to(roomId).emit(
        EVENTS.PARTICIPANTS_UPDATE,
        participants.map((p) => ({
          userId: p.userId,
          userName: p.userName,
        }))
      );
    }
  );

  socket.on("disconnect", () => {
    roomParticipants.forEach(
      (participants, roomId) => {
        const updated =
          participants.filter(
            (p) =>
              p.socketId !== socket.id
          );

        roomParticipants.set(
          roomId,
          updated
        );

        io.to(roomId).emit(
          EVENTS.PARTICIPANTS_UPDATE,
          updated.map((p) => ({
            userId: p.userId,
            userName: p.userName,
          }))
        );
      }
    );
  });
};

module.exports = {
  registerRoomHandlers,
};