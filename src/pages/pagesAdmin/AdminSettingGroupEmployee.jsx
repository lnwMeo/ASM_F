import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";

import {
  listEmployee,
  createemployee,
  updateemployee,
  removeemployee,
} from "../../api/Employee";
import { listGroupwork } from "../../api/Groupwork";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAsmStore from "../../store/asm-store";
const AdminSettingGroupEmployee = () => {
  const token = useAsmStore((state) => state.token);
  // กลุ่มงาน
  const [groupwork, setGroupWork] = useState([]);
  const [selectgroupwork, setSelectGroupWork] = useState("");
  // พนักงาน
  const [employee, setEmployee] = useState([]);
  const [newemployee, setnewEmployee] = useState("");
  // โหมดแก้ไข
  const [editMode, setEditMode] = useState(false);
  const [editemployeeId, setEditEmployeeId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newemployee) {
      toast.warn("โปรดกรอกชื่อพนักงาน!!");
      return; // หยุดการทำงาน
    }
    if (!selectgroupwork) {
      toast.warn("โปรดเลือกกลุ่มงาน!!");
      return; // หยุดการทำงาน
    }

    try {
      const Employyeedata = {
        groupworkId: selectgroupwork,
        employeename: newemployee,
      };
      if (editMode) {
        await updateemployee(token, editemployeeId, Employyeedata);
        toast.success("แก้ไขข้อมูลสำเร็จ !!");
      } else {
        await createemployee(token, Employyeedata); // ส่ง token และ form อย่างถูกต้อง
        toast.success("เพิ่มพนักงานสำเร็จ !!");
      }

      fetchEmployee();
      resetForm();
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error("ไม่สามารถเพิ่มพนักงานได้!");
    }
  };

  const handleRemove = async (id) => {
    const confirmDelete = window.confirm("คุณต้องการลบพนักงาน ใช่หรือไม่ !!");
    if (!confirmDelete) return;
    try {
      await removeemployee(token, id);
      toast.success("ลบสำเร็จ !!!");
      fetchEmployee();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (employee) => {
    setnewEmployee(employee.Employeename);
    setSelectGroupWork(employee.groupworkId);
    setEditMode(true);
    setEditEmployeeId(employee.id);
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
  const fetchEmployee = async () => {
    try {
      const response = await listEmployee();
      setEmployee(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = async () => {
    setnewEmployee(""); // รีเซ็ตชื่อพนักงาน
    setSelectGroupWork(""); // รีเซ็ตกลุ่มงาน
    setEditMode(false); // ปิดโหมดแก้ไข
    setEditEmployeeId(null); // รีเซ็ต ID ที่แก้ไข
  };
  useEffect(() => {
    fetchGroupWork();
    fetchEmployee();
  }, []);

  return (
    <div className="flex justify-center ">
      <div className="w-full lg:w-4/6  shadow-sm p-2 bg-white">
        <p className="text-xl">ผู้ให้บริการ</p>
        <div className="mt-3 flex justify-between">
          <p className="text-md">ตั้งค่า พนักงาน </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-3 flex justify-between gap-2 text-sm">
            <p>เลือกกลุ่มงาน</p>
            <select
              value={selectgroupwork}
              onChange={(e) => setSelectGroupWork(e.target.value)}
              className="flex-grow p-1 border border-blue-600 rounded-md "
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
              value={newemployee}
              onChange={(e) => setnewEmployee(e.target.value)}
              type="text"
              className="flex-grow p-1 border border-green-600 rounded-md "
              placeholder="กรอก ชื่อพนักงาน"
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
          <div className="flex justify-between gap-1  text-sm shadow-sm">
            <div className="w-4/6 bg-gray-100 flex justify-center py-1">
              <p>ชื่อพนักงาน</p>
            </div>
            <div className="w-1/6  bg-gray-200 flex justify-center py-1">
              <p>กลุ่มงาน</p>
            </div>
            <div className="w-1/6  bg-gray-200 flex justify-center py-1">
              <p>แก้ไข ลบ</p>
            </div>
          </div>
          <div className="overflow-y-auto h-96">
            {employee.map((employee) => (
              <div
                key={employee.id}
                className="flex justify-between gap-2 mt-1  py-1 text-sm shadow-sm"
              >
                <div className="w-4/6  flex justify-center">
                  <p>{employee.Employeename}</p>
                </div>
                <div className="w-1/6   flex justify-center ">
                  <p>{employee.groupwork.GroupWorkname}</p>
                </div>
                <div className="w-1/6 flex justify-center ">
                  <div className="inline-flex gap-2">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-md p-1 rounded-md"
                    >
                      <FaEdit className=" " />
                    </button>
                    <button
                      onClick={() => handleRemove(employee.id)}
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

export default AdminSettingGroupEmployee;
