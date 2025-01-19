import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";

import {
  listWorktype,
  createWorktype,
  updateWorktype,
  removeWorktype,
} from "../../api/Worktype";
import { listGroupwork } from "../../api/Groupwork";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAsmStore from "../../store/asm-store";
const AdminSettingServiceType = () => {
  const token = useAsmStore((state) => state.token);
  // กลุ่มงาน
  const [groupwork, setGroupWork] = useState([]);
  const [selectgroupwork, setSelectGroupWork] = useState("");
  // ประเภทงาน
  const [worktype, setWorktype] = useState([]);
  const [newworktype, setnewWorktype] = useState("");
  // โหมดแก้ไข
  const [editMode, setEditMode] = useState(false);
  const [editworktypeId, setEditWorktypeId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newworktype) {
      toast.warn("โปรดกรอกประเภทงาน !!");
      return; // หยุดการทำงาน
    }
    if (!selectgroupwork) {
      toast.warn("โปรดเลือกกลุ่มงาน !!");
      return;
    }
    try {
      const Worktypedata = {
        groupworkId: selectgroupwork,
        worktypename: newworktype,
      };
      if (editMode) {
        await updateWorktype(token, editworktypeId, Worktypedata);
        toast.success("แก้ไขประเภทงานสำเร็จ !!");
      } else {
        await createWorktype(token, Worktypedata);
        toast.success("เพิ่มประเภทงานสำเร็จ !!");
      }
      fetchWorktype();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (id) => {
    const confirmDelete = window.confirm(
      "คุณต้องการลบประเภทงานงาน ใช่หรือไม่ !!"
    );
    if (!confirmDelete) return;
    try {
      await removeWorktype(token, id);
      toast.success("ลบสำเร็จ !!!");
      fetchWorktype();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (worktype) => {
    setnewWorktype(worktype.WorkTypename);
    setSelectGroupWork(worktype.groupworkId);
    setEditMode(true);
    setEditWorktypeId(worktype.id);
  };

  const resetForm = async () => {
    setnewWorktype("");
    setSelectGroupWork("");
    setEditMode(false);
    setEditWorktypeId(null);
  };

  const fetchGroupWork = async () => {
    try {
      const response = await listGroupwork();
      setGroupWork(response.data);
    } catch (error) {
      console.log(error);
      toast.error("ไม่สามารถ โหลดข้อมูลกลุ่มงานได้ !!");
    }
  };

  const fetchWorktype = async () => {
    try {
      const response = await listWorktype();
      setWorktype(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroupWork();
    fetchWorktype();
  }, []);
  return (
    <div className="flex justify-center ">
      <div className="w-full lg:w-4/6  shadow-sm p-2 bg-white">
        <p className="text-xl">ผู้ให้บริการ</p>
        <div className="mt-3 flex justify-between">
          <p className="text-md">ตั้งค่า ประเภทงานที่ให้บริการ </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-3 flex justify-between gap-2 text-sm">
            <p>เลือกกลุ่มงาน</p>
            <select
              value={selectgroupwork}
              onChange={(e) => setSelectGroupWork(e.target.value)}
              className="flex-grow p-1 border border-blue-600 rounded-md"
            >
              <option value="">เลือกกลุ่มงาน</option>
              {groupwork.map((groupwork) => (
                <option key={groupwork.id} value={groupwork.id}>
                  {groupwork.GroupWorkname}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3 flex justify-between gap-2 text-sm">
            <input
              value={newworktype}
              onChange={(e) => setnewWorktype(e.target.value)}
              type="text"
              className="flex-grow p-1 border border-green-600 rounded-md "
              placeholder="กรอก ประเภทงานที่ให้บริการ"
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
        <div className="mt-3  p-2 ">
          <div className="flex justify-between gap-1   shadow-sm text-sm">
            <div className="w-4/6 bg-gray-100 flex justify-center py-1">
              <p>ชื่อประเภทงานที่ให้บริการ</p>
            </div>
            <div className="w-1/6  bg-gray-200 flex justify-center py-1">
              <p>กลุ่มงาน</p>
            </div>
            <div className="w-1/6  bg-gray-200 flex justify-center py-1">
              <p>แก้ไข ลบ</p>
            </div>
          </div>
          <div className="overflow-y-auto h-96">
            {worktype.map((worktype) => (
              <div
                key={worktype.id}
                className="flex justify-between gap-2 mt-1  py-1 shadow-sm text-sm"
              >
                <div className="w-4/6  flex justify-center">
                  <p>{worktype.WorkTypename}</p>
                </div>
                <div className="w-1/6   flex justify-center ">
                  <p>{worktype.groupwork.GroupWorkname}</p>
                </div>
                <div className="w-1/6 flex justify-center ">
                  <div className="inline-flex gap-2">
                    <button
                      onClick={() => handleEdit(worktype)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-md p-1 rounded-md"
                    >
                      <FaEdit className=" " />
                    </button>
                    <button
                      onClick={() => handleRemove(worktype.id)}
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

export default AdminSettingServiceType;
