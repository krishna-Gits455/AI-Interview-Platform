import api from "./api";

export const getRoomDetails = async (
  roomId
) => {
  const response = await api.get(
    `/rooms/${roomId}`
  );

  return response.data;
};
