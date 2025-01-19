import axios from "axios";

export const createGroupwork = async (token, form) => {
  // code body
  return axios.post("http://localhost:5000/api/creategroupwork", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateGroupWork = async (id, token, form) => {
  return axios.put(`http://localhost:5000/api/updategroupwork/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeGroupwork = async (id, token) => {
  return axios.delete(`http://localhost:5000/api/removegroupwork/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listGroupwork = async () => {
  return axios.get("http://localhost:5000/api/listgroupwork");
};

export const listGroupWorkWithWorkTypeEmployee = async () => {
  return axios.get(
    "http://localhost:5000/api/listgroupworkwithworktypeemployee"
  );
};
