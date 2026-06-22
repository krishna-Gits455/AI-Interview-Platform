const executionResults =
  new Map();

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
  EVENTS.EXECUTION_SYNC,
  ({
    roomId,
    result,
  }) => {
    executionResults.set(
      roomId,
      result
    );

    socket.to(roomId).emit(
      EVENTS.EXECUTION_SYNC,
      result
    );
  }
);

  socket.on(
    EVENTS.ROOM_JOIN,
    ({ roomId }) => {
      const state =
        roomEditorState.get(roomId);

      if (state) {
  socket.emit(
    EVENTS.CODE_SYNC,
    state
  );
}

      const execution =
  executionResults.get(roomId);

if (execution) {
  socket.emit(
    EVENTS.EXECUTION_SYNC,
    execution
  );
}
    }
  );
};

module.exports = {
  registerEditorHandlers,
};