import axios from "axios";

export const listEmployee = async () => {
  return axios.get("http://localhost:5000/api/listemployee");
};

export const createemployee = async (token, form) => {
  return axios.post("http://localhost:5000/api/createemployee", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateemployee = async (token, id, form) => {
  return axios.put(`http://localhost:5000/api/updateemployee/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeemployee = async (token, id) => {
  return axios.delete(`http://localhost:5000/api/removeemployee/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listEmployeeGroupwork = async (groupworkId) => {
  const params = {};
  if (groupworkId) params.groupworkId = groupworkId;
  return axios.get("http://localhost:5000/api/listemployeegroupwork", { params });
};
