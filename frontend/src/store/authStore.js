import { create } from "zustand";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "../services/auth.service";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  fetchCurrentUser: async () => {
    try {
      const data =
        await getCurrentUser();

      set({
        user: data.user,
        isAuthenticated: true,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  login: async (credentials) => {
    await loginUser(credentials);

    const data =
      await getCurrentUser();

    set({
      user: data.user,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await logoutUser();

    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;