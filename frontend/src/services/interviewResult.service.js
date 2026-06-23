import api from "./api";

export const getInterviewResult =
  async (interviewId) => {
    const response =
      await api.get(
        `/interviews/${interviewId}/result`
      );

    return response.data.interview;
  };