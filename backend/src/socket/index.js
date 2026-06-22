const { Server } =
  require("socket.io");

const {
  registerRoomHandlers,
} = require("./roomSocket");

const {
  registerEditorHandlers,
} = require("./editorSocket");

const initializeSocket = (
  server
) => {
  const io = new Server(server, {
    cors: {
      origin:
        "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(
      "Socket connected:",
      socket.id
    );

    registerRoomHandlers(
      io,
      socket
    );

    registerEditorHandlers(
      io,
      socket
    );
  });

  return io;
};

module.exports =
  initializeSocket;