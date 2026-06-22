const EVENTS = require("./socketEvents");

const roomEditorState =
  new Map();

const registerEditorHandlers = (
  io,
  socket
) => {
  socket.on(
    EVENTS.CODE_CHANGE,
    ({
      roomId,
      code,
      language,
    }) => {
      roomEditorState.set(
        roomId,
        {
          code,
          language,
        }
      );

      socket.to(roomId).emit(
        EVENTS.CODE_SYNC,
        {
          code,
          language,
        }
      );
    }
  );

  socket.on(
    EVENTS.LANGUAGE_CHANGE,
    ({
      roomId,
      language,
    }) => {
      const current =
        roomEditorState.get(roomId) ||
        {};

      roomEditorState.set(
        roomId,
        {
          ...current,
          language,
        }
      );

      socket.to(roomId).emit(
        EVENTS.LANGUAGE_SYNC,
        {
          language,
        }
      );
    }
  );

  socket.on(
    EVENTS.ROOM_JOIN,
    ({ roomId }) => {
      const state =
        roomEditorState.get(roomId);

      if (!state) return;

      socket.emit(
        EVENTS.CODE_SYNC,
        state
      );
    }
  );
};

module.exports = {
  registerEditorHandlers,
};