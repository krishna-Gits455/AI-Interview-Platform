import debounce from "lodash.debounce";

import { socket } from "../../room/socket/roomSocket";

import { EVENTS } from "../../room/socket/socketEvents";

export const emitCodeChange =
  debounce((payload) => {
    socket.emit(
      EVENTS.CODE_CHANGE,
      payload
    );
  }, 300);

export const emitLanguageChange =
  (payload) => {
    socket.emit(
      EVENTS.LANGUAGE_CHANGE,
      payload
    );
  };

export const listenForCodeSync =
  (handler) => {
    socket.on(
      EVENTS.CODE_SYNC,
      handler
    );
  };

export const removeCodeSyncListener =
  (handler) => {
    socket.off(
      EVENTS.CODE_SYNC,
      handler
    );
  };

export const listenForLanguageSync =
  (handler) => {
    socket.on(
      EVENTS.LANGUAGE_SYNC,
      handler
    );
  };

export const removeLanguageSyncListener =
  (handler) => {
    socket.off(
      EVENTS.LANGUAGE_SYNC,
      handler
    );
  };