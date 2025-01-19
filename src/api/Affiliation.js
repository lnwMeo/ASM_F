import axios from "axios";

export const createAffiliation = async (token, form) => {
  return axios.post("http://localhost:5000/api/createaffiliation", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAffiliation = async (id, token, form) => {
  return axios.put(`http://localhost:5000/api/updateaffiliation/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeAffiliation = async (id, token) => {
  return axios.delete(`http://localhost:5000/api/removeaffiliation/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listAffiliation = async () => {
  return axios.get("http://localhost:5000/api/listAffiliation");
};
