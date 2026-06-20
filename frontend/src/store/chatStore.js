import { create } from "zustand";

import {
  getMessages,
} from "../services/chat.service";

const useChatStore = create(
  (set) => ({
    messages: [],
    isLoading: false,

    fetchMessages: async (
      roomId
    ) => {
      try {
        set({
          isLoading: true,
        });

        const messages =
          await getMessages(
            roomId
          );

        set({
          messages,
        });
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    addMessage: (
      message
    ) => {
      set((state) => ({
        messages: [
          ...state.messages,
          message,
        ],
      }));
    },

    clearMessages: () =>
      set({
        messages: [],
      }),
  })
);

export default useChatStore;