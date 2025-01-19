import { useEffect, useState } from "react";
import ServiceBudget from "../components/forms/ServiceBudget";
import FileInputImg from "../components/forms/FileInputImg";

import { listQuestionrating } from "../api/QuestionRating";
import { listAffiliation } from "../api/Affiliation";
import { listStatusrecipient } from "../api/Statusrecipient";
import { listGroupWorkWithWorkTypeEmployee } from "../api/Groupwork";

import { CreateServiceWork } from "../api/Servicework";
import { toast } from "react-toastify";
const PageForm = () => {
  // คำนำหน้า
  const [statusrecipient, setStatusRecipient] = useState([]);
  const [selectstatusrecipient, setSelectStatusRecipient] = useState("");
  // ชื่อ - สกุล
  const [newservicerecipient, setServiceRecipient] = useState("");
  // สังกัด
  const [affiliation, setAffiliation] = useState([]);
  const [selectaffiliation, setSelectAffiliation] = useState("");

  // กลุ่มงาน
  const [groupWorkData, setGroupWorkData] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  // พนักงาน
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // เก็บประเภทงาน
  const [workTypes, setWorkTypes] = useState([]);
  const [selectedWorktype, setselectedWorktype] = useState("");
  // เก็บรูปภาพ
  const [fields, setFields] = useState([]);

  const handleFileSelect = (file) => {
    setFields(file);
  };
  // เก็บงบประมาณ รวม
  const [serviceBudgetData, setServiceBudgetData] = useState({
    servicebudget: [],
    totalAmount: 0,
  });

  const handleFieldsChange = (fields) => {
    const totalAmount = fields.reduce((sum, field) => sum + field.Amount, 0);
    setServiceBudgetData({
      servicebudget: fields,
      totalAmount,
    });
  };
  // เก็บรายละเอียด
  const [newdescription, setNewDescription] = useState("");

  const [Questionrating, setQuestionrating] = useState([]);
  const [selectedStar, setSelectedStar] = useState({}); // เก็บจำนวนดาวที่เลือก
  const [reset, setReset] = useState(false);
  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchGroupWorkData = async () => {
    try {
      const response = await listGroupWorkWithWorkTypeEmployee(); // ใส่ URL ของ API
      setGroupWorkData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // เมื่อเลือกกลุ่มงาน อัปเดตพนักงานและประเภทงาน
  const handleGroupChange = (groupId) => {
    setSelectedGroup(groupId);
    const selectedGroupData = groupWorkData.find(
      (group) => group.id === Number(groupId)
    );
    setEmployees(selectedGroupData ? selectedGroupData.employee : []);
    setWorkTypes(selectedGroupData ? selectedGroupData.WorkType : []);
  };
  // คำถาม ดาว
  const fetchQuestionrating = async () => {
    try {
      const response = await listQuestionrating();
      setQuestionrating(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleStarClick = (questionId, star) => {
    setSelectedStar((prev) => ({ ...prev, [questionId]: star })); // อัปเดตคะแนนสำหรับคำถามนี้
  };
  // สังกัด
  const handleAffiliation = async () => {
    try {
      const responseA = await listAffiliation();
      setAffiliation(responseA.data);
    } catch (error) {
      console.log(error);
    }
  };
  // คำนำหน้า
  const fetchStatusRecipient = async () => {
    try {
      const response = await listStatusrecipient();
      setStatusRecipient(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // แสดงหน้าต่างยืนยัน
    const isConfirmed = window.confirm(
      "คุณได้ตรวจสอบข้อมูลครบถ้วนแล้วหรือไม่?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      const totalAmount = serviceBudgetData.servicebudget.reduce(
        (sum, budget) => sum + budget.Amount,
        0
      );
      const dataform = {
        // ผู้รับบริการ
        statusrecipientId: selectstatusrecipient,
        servicerecipient: newservicerecipient,
        affiliationId: selectaffiliation,
        // ผู้ให้บริการ
        groupworkId: selectedGroup,
        employeeIds: selectedEmployees,
        worktypeId: selectedWorktype,

        description: newdescription,
        image: fields,
        servicebudget: serviceBudgetData.servicebudget, // ส่งเฉพาะ servicebudget ที่เป็นอาร์เรย์
        totalAmount,
        servicerating: Object.keys(selectedStar).map((questionId) => ({
          questionratingId: parseInt(questionId),
          score: selectedStar[questionId],
        })),
      };
      await CreateServiceWork(dataform);
      // console.log(dataform);
      resetForm();
      toast.success("เพิ่ม แบบประเมินการให้บริการ สำเร็จ !!");
    } catch (error) {
      console.log(error);
      toast.error("เกิดข้อผิดพลาด กรุณากรอกข้อมูลให้ครบถ้วน !!!");
    }
  };
  const resetForm = () => {
    setSelectStatusRecipient("");
    setServiceRecipient("");
    setSelectAffiliation("");
    setSelectedGroup("");
    setSelectedEmployees([]);
    setselectedWorktype("");
    setNewDescription("");
    setSelectedStar({});
    setReset(true);
    // Reset other states if necessary
    setTimeout(() => setReset(false), 0); // Reset `reset` to false after one render
  };

  useEffect(() => {
    fetchGroupWorkData();
    fetchQuestionrating();
    handleAffiliation();
    fetchStatusRecipient();
  }, [fields]);

  return (
    <>
      <div className="w-full  rounded-sm shadow-md p-4 bg-white">
        <form
          onSubmit={handleSubmitForm}
          className="mt-4 w-full xl:max-w-2xl  mx-auto"
        >
          <p className="text-2xl">แบบประเมินการให้บริการ</p>
          <div className="my-2  rounded-md p-1">
            <p className="text-xl">ผู้รับบริการ</p>
            <div className="p-2 text-xs md:text-sm xl:text-sm">
              <div className="my-2 ">
                <p>คำนำหน้า</p>
                <select
                  value={selectstatusrecipient}
                  onChange={(e) => setSelectStatusRecipient(e.target.value)}
                  className="w-full  px-1 py-1 border rounded-md mt-1"
                  required
                >
                  <option value="">เลือกคำนำหน้า</option>
                  {statusrecipient.map((statusrecipient) => (
                    <option key={statusrecipient.id} value={statusrecipient.id}>
                      {statusrecipient.statusrecipientname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="my-2">
                <p>ชื่อ - สกุล</p>
                <input
                  value={newservicerecipient}
                  onChange={(e) => setServiceRecipient(e.target.value)}
                  type="text"
                  className="w-full  px-1 py-1 border rounded-md mt-1"
                  placeholder="ชื่อ - สกุล"
                  required
                />
              </div>

              <div className="my-2">
                <p>สังกัด คณะ / หน่วยงาน / สำนัก </p>
                <select
                  value={selectaffiliation}
                  onChange={(e) => setSelectAffiliation(e.target.value)}
                  className="w-full  px-1 py-1 border rounded-md mt-1"
                  required
                >
                  <option value="">เลือกสังกัด</option>
                  {affiliation.map((affiliation) => (
                    <option key={affiliation.id} value={affiliation.id}>
                      {affiliation.affiliationname}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4  rounded-md p-1">
            <p className="text-xl">ผู้ให้บริการ</p>
            <div className="p-2 text-xs md:text-sm xl:text-sm">
              {/* เลือกกลุ่มงาน */}
              <div className="my-2">
                <p>กลุ่มงานที่ให้บริการ</p>
                <select
                  value={selectedGroup}
                  onChange={(e) => handleGroupChange(e.target.value)} // เชื่อมโยงฟังก์ชันเปลี่ยนกลุ่มงาน
                  className="w-full px-1 py-1 border rounded-md mt-1"
                  required
                >
                  <option value="">เลือกหน่วยงาน</option>
                  {groupWorkData.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.GroupWorkname}
                    </option>
                  ))}
                </select>
              </div>

              {/* แสดงพนักงาน */}
              {selectedGroup && (
                <div className="my-2">
                  <p>เจ้าหน้าที่ที่ให้บริการ</p>
                  <div className="flex flex-col xl:flex-row gap-2 xl:justify-center">
                    {employees.map((employee) => (
                      <div key={employee.id} className="flex gap-2">
                        <input
                          type="checkbox"
                          id={`employee-${employee.id}`}
                          aria-label={employee.Employeename}
                          checked={selectedEmployees.includes(employee.id)}
                          // เมื่อมีการเปลี่ยนแปลง จะเรียก handleCheckboxChange
                          onChange={(e) => {
                            if (e.target.checked) {
                              // เพิ่ม id เข้า selectedEmployees
                              setSelectedEmployees((prev) => [
                                ...prev,
                                employee.id,
                              ]);
                            } else {
                              // ลบ id ออกจาก selectedEmployees
                              setSelectedEmployees((prev) =>
                                prev.filter((id) => id !== employee.id)
                              );
                            }
                          }}
                        />
                        <label htmlFor={`employee-${employee.id}`}>
                          {employee.Employeename}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* แสดงประเภทงาน */}
              {selectedGroup && (
                <div className="my-2">
                  <p>ประเภทงานที่ให้บริการ</p>
                  <select
                    required
                    value={selectedWorktype}
                    onChange={(e) => setselectedWorktype(e.target.value)}
                    className="w-full px-1 py-1 border rounded-md mt-1"
                  >
                    <option value="">เลือกประเภทงานที่ให้บริการ</option>
                    {workTypes.map((workType) => (
                      <option key={workType.id} value={workType.id}>
                        {workType.WorkTypename}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="my-2">
                <p>รูปประกอบ</p>
                {/* FileInputImg */}
                <FileInputImg onFileSelect={handleFileSelect} reset={reset} />
              </div>
              <div className="my-2">
                <p>งบประมาณการให้บริการ</p>
                {/* ServiceBudget */}
                <ServiceBudget
                  onFieldsChange={handleFieldsChange}
                  reset={reset}
                />
              </div>
              <p>รายละเอียด</p>
              <textarea
                value={newdescription}
                onChange={(e) => setNewDescription(e.target.value)}
                type="text"
                className="w-full  px-1 py-1 border rounded-md mt-1 text-xs md:text-sm xl:text-sm"
                placeholder="รายละเอียด"
              />
            </div>
          </div>

          <div className="mt-4  rounded-md p-1">
            <p className="text-xl">คะแนนความพึงพอใจในการรับบริการ</p>

            <div className="p-2 text-xs md:text-sm xl:text-sm">
              {Questionrating.map((Questionrating) => (
                <div key={Questionrating.id} className="my-2 ">
                  <p>{Questionrating.questionname}</p>
                  <div className="flex  gap-2 justify-center">
                    <div className="flex gap-4 my-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          onClick={() =>
                            handleStarClick(Questionrating.id, star)
                          } // ส่ง questionId และจำนวนดาว
                          className={`w-6 h-6 cursor-pointer ${
                            star <= (selectedStar[Questionrating.id] || 0) // ตรวจสอบจำนวนดาวสำหรับคำถามนี้
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 text-xs md:text-sm xl:text-sm   mt-4 ">
            <button className="bg-indigo-800 px-4 py-1 rounded-sm text-gray-50 hover:bg-indigo-900">
              ยืนยัน
            </button>
            <button
              onClick={(e) => {
                e.preventDefault(); // ป้องกันการส่งค่า POST
                resetForm();
              }}
              className="bg-red-500 px-4 py-1 rounded-sm text-gray-50 hover:bg-red-700"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PageForm;
