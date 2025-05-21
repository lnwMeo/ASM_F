import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const listServiceWork = async () => {
  return axios.get(`${apiUrl}/listservicework`);
};
export const listServiceWorkById = async (id) => {
  return axios.get(`${apiUrl}/listserviceworkbyid/${id}`, {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    withCredentials: true,
  });
};



export const UpdateStatusServiceWork = async (payload) => {
  return axios.post(`${apiUrl}/updatestatusservicework`, payload, {
    headers: { "Content-Type": "application/json" },
  });
};

export const CreateServiceWork = async (dataform) => {
  return axios.post(`${apiUrl}/createservicework`, dataform, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getServiceSummary = async (month, year) => {
  const params = {};
  if (month) params.month = month;
  if (year) params.year = year;

  return axios.get(`${apiUrl}/getservicesummary`, { params });
};

export const getEmployeeSummary = async (
  groupworkId,
  employeeId,
  year,
  month
) => {
  const params = {};
  if (groupworkId) params.groupworkId = groupworkId;
  if (employeeId) params.employeeId = employeeId;
  if (month) params.month = month;
  if (year) params.year = year;
  return axios.get(`${apiUrl}/getemployeesummary`, { params });
};
