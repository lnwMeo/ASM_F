import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const createAffiliation = async (token, form) => {
  return axios.post(`${apiUrl}/createaffiliation`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAffiliation = async (id, token, form) => {
  return axios.put(`${apiUrl}/updateaffiliation/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeAffiliation = async (id, token) => {
  return axios.delete(`${apiUrl}/removeaffiliation/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listAffiliation = async () => {
  return axios.get(`${apiUrl}/listAffiliation`);
};
