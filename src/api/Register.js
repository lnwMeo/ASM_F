import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const Register = async (token, form) => {
  return axios.post(`${apiUrl}/register`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listAdmins = async () => {
  return axios.get(`${apiUrl}/listadmin`);
};

export const updateAdmin = async (id, token, form) => {
  return axios.put(`${apiUrl}/updateadmin/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeAdmin = async (id, token) => {
  return axios.delete(`${apiUrl}/removeadmin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
