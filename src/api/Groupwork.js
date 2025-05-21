import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const createGroupwork = async (token, form) => {
  // code body
  return axios.post(`${apiUrl}/creategroupwork`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateGroupWork = async (id, token, form) => {
  return axios.put(`${apiUrl}/updategroupwork/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeGroupwork = async (id, token) => {
  return axios.delete(`${apiUrl}/removegroupwork/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listGroupwork = async () => {
  return axios.get(`${apiUrl}/listgroupwork`);
};

export const listGroupWorkWithWorkTypeEmployee = async () => {
  return axios.get(`${apiUrl}/listgroupworkwithworktypeemployee`);
};
