import api from "./api";

export const getInvitations = async () => {
  const response = await api.get(
    "/interviews/invitations"
  );

  return response.data;
};

export const acceptInvitation = async (
  interviewId
) => {
  const response = await api.post(
    `/interviews/${interviewId}/accept`
  );

  return response.data;
};
