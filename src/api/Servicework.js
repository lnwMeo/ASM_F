import axios from "axios";

export const listServiceWork = async () => {
  return axios.get("http://localhost:5000/api/listservicework");
};
export const listServiceWorkById = async (id) => {
  return axios.get(`http://localhost:5000/api/listserviceworkbyid/${id}`, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};
export const UpdateStatusServiceWork = async (payload) => {
  return axios.post(
    "http://localhost:5000/api/updatestatusservicework",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const CreateServiceWork = async (dataform) => {
  return axios.post("http://localhost:5000/api/createservicework", dataform, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getServiceSummary = async (month, year) => {
  const params = {};
  if (month) params.month = month;
  if (year) params.year = year;

  return axios.get("http://localhost:5000/api/getservicesummary", { params });
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
  return axios.get("http://localhost:5000/api/getemployeesummary", { params });
};
