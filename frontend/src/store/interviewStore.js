import { create } from "zustand";

import {
  createInterview,
  getInterviews,
} from "../services/interview.service";

const useInterviewStore = create(
  (set) => ({
    interviews: [],
    isLoading: false,
    error: null,

    fetchInterviews: async () => {
      try {
        set({
          isLoading: true,
          error: null,
        });

        const data =
          await getInterviews();

        set({
          interviews:
            data.interviews || [],
        });
      } catch (error) {
        set({
          error:
            error.response?.data
              ?.message ||
            "Failed to fetch interviews",
        });
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    createInterview: async (
      interviewData
    ) => {
      try {
        await createInterview(
          interviewData
        );

        const data =
          await getInterviews();

        set({
          interviews:
            data.interviews || [],
        });
      } catch (error) {
        throw error;
      }
    },
  })
);

export default useInterviewStore;