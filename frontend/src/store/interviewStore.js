import { create } from "zustand";

import {
  createInterview,
  getInterviews,
} from "../services/interview.service";
import {
  acceptInvitation,
  getInvitations,
} from "../services/invitation.service";

const useInterviewStore = create(
  (set) => ({
    interviews: [],
    invitations: [],
    isLoading: false,
    invitationsLoading: false,
    error: null,
    invitationError: null,

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

    fetchInvitations: async () => {
      try {
        set({
          invitationsLoading: true,
          invitationError: null,
        });

        const data =
          await getInvitations();

        set({
          invitations:
            data.invitations || [],
        });
      } catch (error) {
        set({
          invitationError:
            error.response?.data
              ?.message ||
            "Failed to fetch invitations",
        });
      } finally {
        set({
          invitationsLoading: false,
        });
      }
    },

    acceptInvitation: async (
      interviewId
    ) => {
      await acceptInvitation(interviewId);

      const [
        invitationsData,
        interviewsData,
      ] = await Promise.all([
        getInvitations(),
        getInterviews(),
      ]);

      set({
        invitations:
          invitationsData.invitations || [],
        interviews:
          interviewsData.interviews || [],
      });
    },

    createInterview: async (
      interviewData
    ) => {
      await createInterview(
        interviewData
      );

      const data =
        await getInterviews();

      set({
        interviews:
          data.interviews || [],
      });
    },
  })
);

export default useInterviewStore;
