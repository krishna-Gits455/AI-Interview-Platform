import { socket }
  from "../../room/socket/roomSocket";

import { EVENTS }
  from "../../room/socket/socketEvents";

export const emitExecutionSync =
  (payload) => {
    socket.emit(
      EVENTS.EXECUTION_SYNC,
      payload
    );
  };

export const listenForExecutionSync =
  (handler) => {
    socket.on(
      EVENTS.EXECUTION_SYNC,
      handler
    );
  };

export const removeExecutionSyncListener =
  (handler) => {
    socket.off(
      EVENTS.EXECUTION_SYNC,
      handler
    );
  };