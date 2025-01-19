import axios from "axios";

export const createQuestionrating = async (token, form) => {
  return axios.post("http://localhost:5000/api/createquestionrating", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateQuestionrating = async (id, token, form) => {
  return axios.put(
    `http://localhost:5000/api/updatequestionrating/${id}`,
    form,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const removeQuestionrating = async (id, token) => {
  return axios.delete(`http://localhost:5000/api/removequestionrating/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listQuestionrating = async () => {
  return axios.get("http://localhost:5000/api/listquestionrating");
};
