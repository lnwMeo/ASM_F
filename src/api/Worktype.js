import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const listWorktype = async () => {
  return axios.get(`${apiUrl}/listworktype`);
};

export const createWorktype = async (token, form) => {
  return axios.post(`${apiUrl}/createworktype`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateWorktype = async (token, id, form) => {
  return axios.put(`${apiUrl}/updateworktype/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeWorktype = async (token, id) => {
  return axios.delete(`${apiUrl}/removeworktype/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
