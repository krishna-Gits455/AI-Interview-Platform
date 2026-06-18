import { create } from "zustand";

import {
  getRoomDetails,
} from "../services/room.service";

const useRoomStore = create((set) => ({
  room: null,
  isLoading: false,
  error: null,
  errorStatus: null,

  fetchRoom: async (roomId) => {
    try {
      set({
        room: null,
        isLoading: true,
        error: null,
        errorStatus: null,
      });

      const room =
        await getRoomDetails(roomId);

      set({ room });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to fetch room",
        errorStatus:
          error.response?.status || 500,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  clearRoom: () => {
    set({
      room: null,
      error: null,
      errorStatus: null,
    });
  },
}));

export default useRoomStore;
