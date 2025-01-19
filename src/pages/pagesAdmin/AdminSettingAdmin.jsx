import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import { useState, useEffect } from "react";

import {
  Register,
  listAdmins,
  updateAdmin,
  removeAdmin,
} from "../../api/Register";
import useAsmStore from "../../store/asm-store";
import { toast } from "react-toastify";
const AdminSettingAdmin = () => {
  // ประกาศตัวแปรเก็บอ็อปเจค
  const token = useAsmStore((state) => state.token);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [listadmins, setListAdmin] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editformId, setEditFormId] = useState(null);
  const currentUserId = useAsmStore.getState().user?.id; // ดึง user id ที่ล็อกอินอยู่


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

    if (!setForm) {
      return toast.warning("Please fill data");
    }
    // ส่งค่าไปหลังบ้าน
    try {
      if (editMode) {
        const res = await updateAdmin(editformId, token, form);
        console.log(res.data.message);
        toast.success(`Update Admid ${res.data.message}  Success!!!`);
      } else {
        const res = await Register(token, form);
        console.log(res.data.message);
        toast.success(`Add Admid ${res.data.message}  Success!!!`);
      }
      fetchAdmin();
      resetForm();
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const resetForm = () => {
    setForm({
      username: "",
      password: "",
    });
    setEditMode(false);
    setEditFormId(null);
  };
  const fetchAdmin = async () => {
    try {
      const res = await listAdmins(token);
      setListAdmin(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (listadmins) => {
    setForm(listadmins, {
      username: "",
    });
    setEditMode(true);
    setEditFormId(listadmins.id);
  };

const handleRemove = async (id) => {
  if (id === currentUserId) {
    toast.error("ไม่สามารถลบผู้ใช้ที่กำลังล็อกอินอยู่ได้!");
    return;
  }

  const confirmDelete = window.confirm("คุณต้องการลบหรือไม่?");
  if (!confirmDelete) return;

  try {
    await removeAdmin(id, token);
    toast.success("ลบสำเร็จ!!");
    fetchAdmin(); // โหลดข้อมูลใหม่หลังจากลบ
  } catch (error) {
    console.log(error);
    const errMsg = error.response?.data?.message;
    toast.error(errMsg);
  }
};

  useEffect(() => {
    fetchAdmin();
  }, [token]);
  return (
    <div className="flex justify-center ">
      <div className="w-full lg:w-4/6  shadow-sm p-2 bg-white">
        <p className="text-xl">ตั้งค่าแอดมิน</p>
        <div className="mt-3 flex justify-between">
          <p className="text-md">ตั้งค่า แอดมิน </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-3 flex justify-between  items-end gap-2 text-sm">
            <div className="flex-grow w-full">
              <p>Username</p>
              <input
                value={form.username}
                onChange={handleOnchange}
                type="text"
                name="username"
                className="w-full p-1 border border-green-600 rounded-md"
                placeholder="กรอก Username"
              />
            </div>
            <div className="flex-grow w-full">
              <p>Password</p>
              <input
                value={form.password}
                onChange={handleOnchange}
                type="text"
                name="password"
                className="w-full p-1 border border-green-600 rounded-md"
                placeholder="กรอก Password"
              />
            </div>
            <button
              className={`${
                editMode
                  ? "bg-yellow-600 hover:bg-yellow-500 "
                  : "bg-green-600 hover:bg-green-500"
              } px-6 rounded-md flex-grow p-1`}
            >
              {editMode ? "แก้ไข" : "เพิ่ม"}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault(); // ป้องกันการส่งค่า POST
                resetForm(); // เรียกฟังก์ชัน resetForm
              }}
              className="bg-blue-600 flex-grow  hover:bg-blue-500 px-4 rounded-md text-white py-2"
            >
              <TbRefresh />
            </button>
          </div>
        </form>
        <div className="mt-3  p-2 ">
          <div className="flex justify-between gap-1   shadow-sm text-sm">
            <div className="w-5/6 bg-gray-100 flex justify-center py-1">
              <p>Username</p>
            </div>
            <div className="w-1/6  bg-gray-200 flex justify-center py-1">
              <p>แก้ไข ลบ</p>
            </div>
          </div>
          <div className="overflow-y-auto h-96">
            {listadmins.map((listadmins) => (
              <div
                key={listadmins.id}
                className="flex justify-between gap-2 mt-1  py-1 shadow-sm text-sm"
              >
                <div className="w-5/6  flex justify-center">
                  <p>{listadmins.username}</p>
                </div>
                <div className="w-1/6 flex justify-center ">
                  <div className="inline-flex gap-2">
                    <button
                      onClick={() => handleEdit(listadmins)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-md p-1 rounded-md"
                    >
                      <FaEdit className=" " />
                    </button>
                    <button
                      onClick={() => handleRemove(listadmins.id)}
                      className="bg-red-500 hover:bg-red-400 text-md p-1 rounded-md"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingAdmin;
