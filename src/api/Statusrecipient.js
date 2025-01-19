import axios from "axios";

export const createStatusrecipient = async (token,form ) => {
  return axios.post("http://localhost:5000/api/createstatusrecipient", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateStatusrecipient = async (id,token, form ) => {
  return axios.put(
    `http://localhost:5000/api/updatestatusrecipient/${id}`,
    form,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const removeStatusrecipient = async (id,token ) => {
  return axios.delete(`http://localhost:5000/api/removestatusrecipient/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listStatusrecipient = async () => {
  return axios.get("http://localhost:5000/api/liststatusrecipient");
};
