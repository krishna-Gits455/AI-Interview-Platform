import api from "../../../services/api";

export const endInterview =
  async (
    interviewId,
    payload
  ) => {
    const response =
      await api.post(
        `/interviews/${interviewId}/end`,
        payload
      );

    return response.data;
  };