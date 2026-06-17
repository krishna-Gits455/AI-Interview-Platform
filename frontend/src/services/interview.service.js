import api from "./api";

export const createInterview = async (data) => {
  const response = await api.post(
    "/interviews",
    data
  );

  return response.data;
};

export const getInterviews = async () => {
  const response = await api.get(
    "/interviews"
  );

  return response.data;
};