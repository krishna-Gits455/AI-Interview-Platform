import api from "./api";

export const getMessages = async (
  roomId
) => {
  const response = await api.get(
    `/chat/${roomId}`
  );

  return response.data.messages;
};