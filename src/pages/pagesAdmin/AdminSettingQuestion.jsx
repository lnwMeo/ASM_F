import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import { useState, useEffect } from "react";
import {
  createQuestionrating,
  updateQuestionrating,
  removeQuestionrating,
  listQuestionrating,
} from "../../api/QuestionRating";
import useAsmStore from "../../store/asm-store";
import { toast } from "react-toastify";
const AdminSettingQuestion = () => {
  const token = useAsmStore((state) => state.token);
  const [newQuestionrating, setnewQuestionrating] = useState();
  const [Questionrating, setQuestionrating] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editQuestionratingId, setEditQuestionratingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newQuestionrating) {
      return toast.warning("Please fill data");
    }
    try {
      if (editMode) {
        const res = await updateQuestionrating(editQuestionratingId, token, {
          questionname: newQuestionrating,
        });
        console.log(res);
        toast.success(
          `Update Questionrating ${res.data.questionname} Success!!!`
        );
      } else {
        const res = await createQuestionrating(token, {
          questionname: newQuestionrating,
        });
        console.log(res);
        toast.success(`Add Questionrating ${res.data.questionname} Success!!!`);
      }
      fetchQuestionrating();
      resetForm();
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };
  const handleEdit = async (Questionrating) => {
    setnewQuestionrating(Questionrating.questionname);
    setEditMode(true);
    setEditQuestionratingId(Questionrating.id);
  };
  const handleRemove = async (id) => {
    const confirmDelete = window.confirm("คุณต้องการลบหรือไม่?");
    if (!confirmDelete) return;
    try {
      await removeQuestionrating(id, token);
      toast.success("ลบสำเร็จ!!");
      fetchQuestionrating();
    } catch (error) {
      console.log(error);
      const errMsg = error.response?.data?.message;
      toast.error(errMsg);
    }
  };
  const fetchQuestionrating = async () => {
    try {
      const response = await listQuestionrating();
      setQuestionrating(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const resetForm = () => {
    setnewQuestionrating("");
    setEditMode(false);
    setEditQuestionratingId(null);
  };
  useEffect(() => {
    fetchQuestionrating();
  }, []);
  return (
    <div className="flex justify-center ">
      <div className="w-full lg:w-4/6  shadow-sm p-2 bg-white">
        <p className="text-xl">จัดการคำถามการให้บริการ</p>
        <div className="mt-3 flex justify-between">
          <p className="text-md">ตั้งค่า คำถามการให้บริการ</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-3 flex justify-between gap-2 text-sm">
            <input
               value={newQuestionrating || ""} // ป้องกันการตั้งค่า undefined
               onChange={(e) => setnewQuestionrating(e.target.value)} // ใช้ setnewQuestionrating ที่ถูกต้อง
              type="text"
              className="flex-grow p-1 border border-green-600 rounded-md"
              placeholder="กรอก คำถามการให้บริการ"
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
              <p>คำถามการให้บริการ</p>
            </div>
            <div className="w-1/6  bg-gray-200 flex justify-center py-1">
              <p>แก้ไข ลบ</p>
            </div>
          </div>
          <div className="overflow-y-auto h-96">
            {Questionrating.map((Questionrating) => (
              <div
                key={Questionrating.id}
                className="flex justify-between gap-2 mt-1  py-1 shadow-sm text-sm"
              >
                <div className="w-5/6  flex justify-center">
                  <p>{Questionrating.questionname}</p>
                </div>
                <div className="w-1/6 flex justify-center ">
                  <div className="inline-flex gap-2">
                    <button
                      onClick={() => handleEdit(Questionrating)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-md p-1 rounded-md"
                    >
                      <FaEdit className=" " />
                    </button>
                    <button
                      onClick={() => handleRemove(Questionrating.id)}
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

export default AdminSettingQuestion;
