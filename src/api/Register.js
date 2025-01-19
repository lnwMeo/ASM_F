import axios from "axios";

export const Register = async (token , form) =>{
    return axios.post("http://localhost:5000/api/register",form,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })
}

export const listAdmins = async (token) =>{
    return axios.get("http://localhost:5000/api/listadmin",{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })
}

export const updateAdmin = async (id, token, form) =>{
    return axios.put(
        `http://localhost:5000/api/updateadmin/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
}

export const removeAdmin = async (id , token) =>{
    return axios.delete(`http://localhost:5000/api/removeadmin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
}