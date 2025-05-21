import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const listEmployee = async () => {
  return axios.get(`${apiUrl}/listemployee`);
};

export const createemployee = async (token, form) => {
  return axios.post(`${apiUrl}/createemployee`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateemployee = async (token, id, form) => {
  return axios.put(`${apiUrl}/updateemployee/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeemployee = async (token, id) => {
  return axios.delete(`${apiUrl}/removeemployee/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listEmployeeGroupwork = async (groupworkId) => {
  const params = {};
  if (groupworkId) params.groupworkId = groupworkId;
  return axios.get(`${apiUrl}/listemployeegroupwork`, { params });
};
