import axios from "axios";

export const listWorktype = async () => {
  return axios.get("http://localhost:5000/api/listworktype");
};

export const createWorktype = async (token, form) => {
  return axios.post("http://localhost:5000/api/createworktype", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateWorktype = async (token, id, form) => {
  return axios.put(`http://localhost:5000/api/updateworktype/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeWorktype = async (token, id) => {
  return axios.delete(`http://localhost:5000/api/removeworktype/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
