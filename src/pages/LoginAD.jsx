import { useState } from "react";
// import axios from "axios";
import { toast } from "react-toastify";
import useAsmStore from "../store/asm-store";
import { useNavigate } from "react-router-dom";

const LoginAD = () => {
  const navigate = useNavigate();
  const actionLogin = useAsmStore((state) => state.actionLogin);
  useAsmStore((state) => state.user);
  // console.log("user form zustand", user);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleOnchange = (e) => {
    setForm({
      // ดึงค่าเดิมจาก state
      ...form,
      // key:value
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // ฟังชั่นป้องกันการ refact
    e.preventDefault();
    // ส่งค่าไปหลังบ้าน
    try {
      // const res =
      await actionLogin(form);
      toast.success("Welcome Back Admin!!!");
      navigate("/admin");
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  // ป้องกันการเข้าถึง part

  return (
    <div className="flex justify-center items-center mt-5">
      <div className="w-full md:w-1/3 xl:w-1/3 rounded-sm shadow-md p-4 bg-white">
        <form onSubmit={handleSubmit}>
          <p className="text-2xl">Login</p>
          <div className="mt-2 px-2 ">
            <p className="text-md">Username</p>
            <input
              onChange={handleOnchange}
              name="username"
              type="text"
              className="w-full p-1 border border-indigo-600 rounded-md "
              placeholder="Username"
              autoComplete="current-username" 
            />
            <p className="text-md mt-2">Password</p>
            <input
              onChange={handleOnchange}
              type="password"
              name="password"
              className="w-full p-1 border border-indigo-600 rounded-md "
              placeholder="Password"
              autoComplete="current-password" 
            />
            <div className="mt-4">
              <button className="bg-indigo-700 w-full text-white py-1 rounded-md hover:bg-indigo-800">
                Login{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginAD;
