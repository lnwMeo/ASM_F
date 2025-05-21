import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const createQuestionrating = async (token, form) => {
  return axios.post(`${apiUrl}/createquestionrating`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateQuestionrating = async (id, token, form) => {
  return axios.put(
    `${apiUrl}/updatequestionrating/${id}`,
    form,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const removeQuestionrating = async (id, token) => {
  return axios.delete(`${apiUrl}/removequestionrating/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listQuestionrating = async () => {
  return axios.get(`${apiUrl}/listquestionrating`);
};
