import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const createStatusrecipient = async (token, form) => {
  return axios.post(`${apiUrl}/createstatusrecipient`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateStatusrecipient = async (id, token, form) => {
  return axios.put(`${apiUrl}/updatestatusrecipient/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const removeStatusrecipient = async (id, token) => {
  return axios.delete(`${apiUrl}/removestatusrecipient/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listStatusrecipient = async () => {
  return axios.get(`${apiUrl}/liststatusrecipient`);
};
