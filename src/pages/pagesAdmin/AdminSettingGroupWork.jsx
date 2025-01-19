import { useState, useEffect } from "react";
import {
  createGroupwork,
  listGroupwork,
  updateGroupWork,
  removeGroupwork,
} from "../../api/Groupwork";
import useAsmStore from "../../store/asm-store";
import { toast } from "react-toastify";

import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";

const AdminSettingGroupWork = () => {
  const token = useAsmStore((state) => state.token);
  const [newgroupworkname, setnewGroupworkname] = useState("");
  const [groupwork, setGroupwork] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editgroupworkId, setEditGroupWorkId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newgroupworkname) {
      return toast.warning("Please fill data");
    }
    try {
      if (editMode) {
        const res = await updateGroupWork(editgroupworkId, token, {
          groupworkname: newgroupworkname,
        });
        console.log(res);
        toast.success(`Update Groupwork ${res.data.groupworkname} success!!!`);
      } else {
        const res = await createGroupwork(token, {
          groupworkname: newgroupworkname,
        });
        console.log(res);
        toast.success(`Add Groupwork ${res.data.groupworkname} success!!!`);
      }
      fetchGroupwork();
      resetForm();
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const handleRemove = async (id) => {
    const confirmDelete = window.confirm("คำเตือน !!! คุณต้องการลบกลุ่มงาน นี้หรือไม่ ? เมื่อคุณลบ พนักงาน และประเภทงาน ของกลุ่มนี้จะถูกลบไปด้วย !!!");
    if (!confirmDelete) return; // ถ้าผู้ใช้กด Cancel ให้หยุดการลบ
    try {
      await removeGroupwork(id, token);
      toast.success("ลบกลุ่มงานสำเร็จ!");
      fetchGroupwork();
    } catch (error) {
      console.log(error);
    }
  };
  // ฟังก์ชันสำหรับเคลียร์ฟอร์ม
  const resetForm = () => {
    setnewGroupworkname("");
    setEditMode(false);
    setEditGroupWorkId(null);
  };

  const handleEdit = (groupwork) => {
    setnewGroupworkname(groupwork.groupworkname || groupwork.GroupWorkname);
    setEditMode(true);
    setEditGroupWorkId(groupwork.id);
  };
  const fetchGroupwork = async () => {
    try {
      const response = await listGroupwork();
      setGroupwork(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroupwork();
  }, []);

  return (
    <div className="flex justify-center ">
      <div className="w-full lg:w-4/6  shadow-sm p-2 bg-white">
        <p className="text-xl">ผู้ให้บริการ</p>
        <div className="mt-3 flex justify-between">
          <p className="text-md">ตั้งค่ากลุ่มงาน</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-3 flex justify-between gap-2 text-sm">
            <input
              value={newgroupworkname}
              onChange={(e) => setnewGroupworkname(e.target.value)}
              type="text"
              className="flex-grow p-1 border border-green-600 rounded-md "
              placeholder="กรอก ชื่อกลุ่มงาน"
            />
            <button
              className={`${
                editMode
                  ? "bg-yellow-600 hover:bg-yellow-500 "
                  : "bg-green-600 hover:bg-green-500"
              } px-6 rounded-md`}
            >
              {editMode ? "แก้ไข" : "เพิ่ม"}
            </button>
            <button
              onClick={resetForm}
              className="bg-blue-600 hover:bg-blue-500 px-2 rounded-md text-white"
            >
              <TbRefresh />
            </button>
          </div>
        </form>
        <div className="mt-3  p-2 text-sm">
          <div className="flex justify-between gap-1   shadow-sm">
            <div className="w-5/6 bg-gray-100 flex justify-center py-1">
              <p>ชื่อกลุ่มงาน</p>
            </div>
            <div className="w-1/6  bg-gray-200 flex justify-center py-1">
              <p>แก้ไข ลบ</p>
            </div>
          </div>
          <div className="overflow-y-auto h-96">
            {groupwork.map((groupwork) => (
              <div
                key={groupwork.id}
                className="flex justify-between gap-2 mt-1  py-1 shadow-sm "
              >
                <div className="w-5/6  flex justify-center">
                  <p>{groupwork.GroupWorkname}</p>
                </div>
                <div className="w-1/6 flex justify-center ">
                  <div className="inline-flex gap-2">
                    <button
                      onClick={() => handleEdit(groupwork)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-md p-1 rounded-md"
                    >
                      <FaEdit className=" " />
                    </button>
                    <button
                      onClick={() => handleRemove(groupwork.id)}
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

export default AdminSettingGroupWork;
