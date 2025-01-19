import { useState, useEffect } from "react";
import {
  createAffiliation,
  updateAffiliation,
  removeAffiliation,
  listAffiliation,
} from "../../api/Affiliation";
import useAsmStore from "../../store/asm-store";
import { toast } from "react-toastify";

import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";

const Adminindex = () => {
  const token = useAsmStore((state) => state.token);
  const [newAffiliationname, setnewAffiliationname] = useState("");
  const [affiliation, setAffiliation] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editAffiliationId, setEditAffiliationId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAffiliationname) {
      return toast.warning("Please fill data");
    }
    
    try {
      if (editMode) {
        const res = await updateAffiliation(editAffiliationId, token, {
          affiliationname: newAffiliationname,
        });
        console.log(res);
        toast.success(
          `Update Affiliation ${res.data.affiliationname} Success!!!`
        );
      } else {
        const res = await createAffiliation(token, {
          affiliationname: newAffiliationname,
        });
        console.log(res);
        toast.success(`Add Affiliation ${res.data.affiliationname} Success!!!`);
      }
      fetchAffiliation();
      resetForm();
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const handleEdit = (affiliation) => {
    setnewAffiliationname(affiliation.affiliationname);
    setEditMode(true);
    setEditAffiliationId(affiliation.id);
  };

  const handleRemove = async (id) => {
    const confirmDelete = window.confirm("คุณต้องการลบหรือไม่?");
    if (!confirmDelete) return;
    try {
      await removeAffiliation(id, token);
      toast.success("ลบสำเร็จ!!");
      fetchAffiliation();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAffiliation = async () => {
    try {
      const response = await listAffiliation();
      setAffiliation(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setnewAffiliationname("");
    setEditMode(false);
    setEditAffiliationId(null);
  };
  useEffect(() => {
    fetchAffiliation();
  }, []);
  return (
    <>
      <div className="flex justify-center ">
        <div className="w-full lg:w-4/6  shadow-sm p-2 bg-white">
          <p className="text-xl">ผู้รับบริการ</p>
          <div className="mt-3 flex justify-between">
            <p className="text-md">ตั้งค่า สังกัด คณะ / หน่วยงาน / สำนัก </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-3 flex justify-between gap-2 text-sm">
              <input
                value={newAffiliationname}
                onChange={(e) => setnewAffiliationname(e.target.value)}
                type="text"
                className="flex-grow p-1 border border-green-600 rounded-md"
                placeholder="กรอก สังกัด คณะ / หน่วยงาน / สำนัก"
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
            <div className="flex justify-between gap-1 text-sm  shadow-sm">
              <div className="w-5/6 bg-gray-100 flex justify-center py-1">
                <p>ชื่อ</p>
              </div>
              <div className="w-1/6  bg-gray-200 flex justify-center py-1">
                <p>แก้ไข ลบ</p>
              </div>
            </div>
            <div className="overflow-y-auto h-96">
            {affiliation.map((affiliation) => (
                <div
                  key={affiliation.id}
                  className="flex justify-between gap-2 mt-1  py-1 shadow-sm text-sm "
                >
                  <div className="w-5/6  flex justify-center">
                    <p>{affiliation.affiliationname}</p>
                  </div>
                  <div className="w-1/6 flex justify-center ">
                    <div className="inline-flex gap-2">
                      <button onClick={()=>handleEdit(affiliation)} className="bg-yellow-500 hover:bg-yellow-400 text-md p-1 rounded-md">
                        <FaEdit className=" " />
                      </button>
                      <button
                       onClick={() => handleRemove(affiliation.id)}
                      className="bg-red-500 hover:bg-red-400 text-md p-1 rounded-md">
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

export default Adminindex;
