import { useState, useEffect } from "react";
import {
  createStatusrecipient,
  updateStatusrecipient,
  removeStatusrecipient,
  listStatusrecipient,
} from "../../api/Statusrecipient";

import useAsmStore from "../../store/asm-store";
import { toast } from "react-toastify";

import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";

const AdminSettingStatusRecipient = () => {
  const token = useAsmStore((state) => state.token);
  const [newstatusrecipientname, setnewStatusRecipientname] = useState("");
  const [statusrecipient, setStatusRecipient] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editstatusrecipientId, setEditStatusRecipientId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newstatusrecipientname) {
      return toast.warning("Please fill data");
    }
    if (!token) {
      return toast.error("กรุณาเข้าสู่ระบบอีกครั้ง");
    }
    try {
      if (editMode) {
        const res = await updateStatusrecipient(editstatusrecipientId, token, {
          statusname: newstatusrecipientname,
        });
        console.log(res);
        toast.success(
          `Update StatusRecipient ${res.data.statusrecipientname} success!!!`
        );
      } else {
        const res = await createStatusrecipient(token, {
          statusname: newstatusrecipientname,
        });
        console.log(res);
        toast.success(
          `Add StatusRecipient ${res.data.statusrecipientname} success!!!`
        );
      }
      fetchStatusRecipient();
      resetForm();
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };
  const handleRemove = async (id) => {
    const confirmDelete = window.confirm("คุณต้องการลบหรือไม่?");
    if (!confirmDelete) return; // ถ้าผู้ใช้กด Cancel ให้หยุดการลบ
    try {
      await removeStatusrecipient(id, token);
      toast.success("ลบกลุ่มงานสำเร็จ!");
      fetchStatusRecipient();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setnewStatusRecipientname("");
    setEditMode(false);
    setEditStatusRecipientId(null);
  };
  const handleEdit = (statusrecipient) => {
    setnewStatusRecipientname(
      statusrecipient.statusrecipientname || statusrecipient.statusrecipientname
    );
    setEditMode(true);
    setEditStatusRecipientId(statusrecipient.id);
  };

  const fetchStatusRecipient = async () => {
    try {
      const response = await listStatusrecipient();
      setStatusRecipient(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStatusRecipient();
  }, []);
  return (
    <>
      <div className="flex justify-center ">
        <div className="w-full lg:w-4/6  shadow-sm p-2 bg-white">
          <p className="text-xl">ผู้รับบริการ</p>
          <div className="mt-3 flex justify-between">
            <p className="text-md">ตั้งค่า สถานะ (คำนำหน้า) </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-3 flex justify-between gap-2 text-sm">
              <input
                value={newstatusrecipientname}
                onChange={(e) => setnewStatusRecipientname(e.target.value)}
                type="text"
                className="flex-grow p-1 border border-green-600 rounded-md "
                placeholder="กรอก คำนำหน้า"
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
                <p>ชื่อ</p>
              </div>
              <div className="w-1/6  bg-gray-200 flex justify-center py-1">
                <p>แก้ไข ลบ</p>
              </div>
            </div>
            <div className="overflow-y-auto h-96">
              {statusrecipient.map((statusrecipient) => (
                <div
                  key={statusrecipient.id}
                  className="flex justify-between gap-2 mt-1  py-1 shadow-sm"
                >
                  <div className="w-5/6  flex justify-center">
                    <p>{statusrecipient.statusrecipientname}</p>
                  </div>
                  <div className="w-1/6 flex justify-center ">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => handleEdit(statusrecipient)}
                        className="bg-yellow-500 hover:bg-yellow-400 text-md p-1 rounded-md"
                      >
                        <FaEdit className=" " />
                      </button>
                      <button
                        onClick={() => handleRemove(statusrecipient.id)}
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
    </>
  );
};

export default AdminSettingStatusRecipient;
