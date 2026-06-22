import api from "./api";

export const getEditorState = async (
  roomId
) => {
  const response =
    await api.get(
      `/rooms/${roomId}/editor-state`
    );

  return response.data;
};

export const saveEditorState = async (
  roomId,
  payload
) => {
  const response =
    await api.put(
      `/rooms/${roomId}/editor-state`,
      payload
    );

  return response.data;
};