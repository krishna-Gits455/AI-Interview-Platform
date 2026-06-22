import api from "../../../services/api";

export const runCodeRequest =
  async (payload) => {
    const response =
      await api.post(
        "/execution/run",
        payload
      );

    return response.data.result;
  };