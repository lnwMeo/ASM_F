import { RiArrowGoBackFill } from "react-icons/ri";
// import { FaFilePdf } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { listServiceWorkById } from "../api/Servicework";
import { UpdateStatusServiceWork } from "../api/Servicework";
import { toast } from "react-toastify";
// import DS from "./../assets/images/1.jpg";

import ExportPDFButton from "../components/forms/ExportPDFButton";

const DetailDataAll = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [confirmName, setConFirmName] = useState("");
  const [confirmRank, setConFirmRank] = useState("");

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!confirmName || !confirmRank) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    const payload = {
      id: Number(id), // ID ของ ServiceWork ที่จะอัปเดต
      statusconfirm: true,
      confirmbyname: {
        name: confirmName,
        rank: confirmRank,
      },
    };

    try {
      const response = await UpdateStatusServiceWork(payload);
      console.log(response);
      toast.success("Update Success !!!");
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await listServiceWorkById(id); // ส่ง id ไปที่ฟังก์ชัน API
      setData(response.data);
    } catch (error) {
      console.error("Error fetching service work details:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!data) {
    return <p>กำลังโหลดข้อมูลหรือไม่พบข้อมูล...</p>;
  }
  return (
    <div className="w-full  rounded-sm shadow-md p-4 bg-white">
      <div className="flex justify-start">
        <Link
          to="/dataall"
          className="text-md md:text-xl xl:text-xl inline-flex items-center gap-2"
        >
          <RiArrowGoBackFill /> กลับ
        </Link>
      </div>
      {data?.map((data) => {
        return (
          <div key={data.id} className="mt-4 w-full xl:max-w-2xl  mx-auto ">
            <p className="text-2xl scroll-mb-4 font-semibold">
              รายละเอียดข้อมูลการให้บริการ
            </p>
            <div className="my-2  rounded-md p-1">
              <p className="text-xl mb-2 font-semibold">
                วันที่ {data?.serviceDate}
              </p>
              <div className="my-2">
                <p className="text-xl font-semibold">ผู้รับบริการ</p>
                <div className="p-2 text-sm md:text-base xl:text-base  my-1">
                  <p>คำนำหน้า : {data?.statusrecipient?.statusrecipientname}</p>
                  <p>ผู้รับบริการ : {data?.servicerecipient}</p>
                  <p>
                    สังกัด คณะ / หน่วยงาน / สำนัก :{" "}
                    {data?.affiliation.affiliationname}
                  </p>
                </div>
              </div>
              <div className="my-2">
                <p className="text-xl font-semibold">ผู้ให้บริการ</p>
                <div className="p-2 text-sm md:text-base xl:text-base ">
                  <p>กลุ่มงานที่ให้บริการ : {data?.groupwork.GroupWorkname}</p>
                  <div className="flex gap-2  my-1">
                    <p>เจ้าหน้าที่ที่ให้บริการ : </p>
                    {data?.ServiceWorkEmployee.map((employee) => (
                      <p key={employee.id}>{employee.employee.Employeename}</p>
                    ))}
                  </div>
                  <p>ประเภทงานที่ให้บริการ : {data?.worktype.WorkTypename}</p>
                </div>
              </div>
              <div className="my-2">
                <p className="text-xl font-semibold">รูปประกอบ</p>
                <div className="p-2 flex justify-center ">
                  <img
                    src={`http://localhost:5000/${data?.image}`}
                    alt=""
                    className="w-3/4 max-w-md"
                  />
                </div>
              </div>

              <div className="my-2">
                <p className="text-xl font-semibold">งบประมาณการให้บริการ</p>

                <div className="p-2 text-sm md:text-base xl:text-base">
                  {data?.servicebudget.map((servicebudget) => (
                    <div
                      key={servicebudget.id}
                      className="flex justify-between gap-2  my-1"
                    >
                      <p>{servicebudget.ServiceBudgetname}</p>
                      <p>{servicebudget.Amount} บาท</p>
                    </div>
                  ))}
                  <div className="font-medium mt-2 flex gap-2 justify-end">
                    ยอดรวม :
                    <p className="text-indigo-700 text-lg">
                      {" "}
                      {data.totalAmount}
                    </p>
                    บาท
                  </div>
                </div>
              </div>
              <div className="my-2">
                <p className="text-xl font-semibold">รายละเอียด</p>
                <div className="p-2 text-sm md:text-base xl:text-base">
                  <p className="">{data?.description || "ไม่ได้ระบุ"} </p>
                </div>
              </div>

              <div className="my-2">
                <p className="text-xl font-semibold">
                  คะแนนความพึงพอใจในการรับบริการ
                </p>
                <div className="p-2 text-sm md:text-base xl:text-base">
                  {data?.servicerating.map((servicerating) => (
                    <div
                      key={servicerating.id}
                      className="flex justify-between my-1"
                    >
                      <div className="flex-grow">
                        <p className="whitespace-normal break-words">
                          {servicerating.questionrating.questionname}
                        </p>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <p className="">{servicerating.score} คะแนน</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex justify-end mb-5">
                {data?.statusconfirm ? (
                  // แสดงข้อมูลเมื่อ statusconfirm = true
                  <div className="flex-col">
                    <div className="text-center">
                      <div className="mt-2">
                        <p>{data?.confirmbyname?.name}</p>
                        <p className="mt-2">ผู้รับรอง</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="mt-2">
                        <p>ตำแหน่ง : {data?.confirmbyname?.rank}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // แสดงฟอร์มเมื่อ statusconfirm = false
                  <div className="mt-5 flex justify-end mb-5">
                    <form onSubmit={handleConfirm}>
                      <div className="flex-col">
                        <div className="mt-2">
                          <p>ชื่อผู้รับรอง</p>
                          <input
                            type="text"
                            className="border rounded-md p-1 "
                            value={confirmName}
                            onChange={(e) => setConFirmName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mt-2">
                          <p>ตำแหน่ง</p>
                          <input
                            type="text"
                            className="border rounded-md p-1"
                            value={confirmRank}
                            onChange={(e) => setConFirmRank(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mt-2">
                          <button className="w-full bg-green-800 px-4 py-1 rounded-sm text-gray-50 hover:bg-green-900">
                            ยืนยัน
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              {/* PDF */}
              <div className="flex justify-center">
                {data?.statusconfirm === true && (
                  // <button
                  //   className="p-2 bg-indigo-800 text-white rounded-sm text-sm md:text-sm xl:text-sm hover:bg-indigo-900 inline-flex gap-2 items-center"

                  // >
                  //   <FaFilePdf /> Export to PDF
                  // </button>
                  <ExportPDFButton data={[data]} />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailDataAll;
