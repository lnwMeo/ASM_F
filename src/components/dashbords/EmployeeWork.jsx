import ExportPDFEM from "./expordpdf/ExportPDFEM";
import { useEffect, useState } from "react";
import { getEmployeeSummary } from "../../api/Servicework"; // ปรับให้ตรงกับ path ของคุณ
import { listGroupwork } from "../../api/Groupwork";
import { listEmployeeGroupwork } from "../../api/Employee";
import { LuRefreshCcw } from "react-icons/lu";


const EmployeeWork = () => {
  const [groupworkId, setGroupworkId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [data, setData] = useState([]);
  const [groupworks, setGroupworks] = useState([]);
  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getEmployeeSummary(
        groupworkId,
        employeeId,
        year,
        month
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchGroupworks = async () => {
    try {
      const response = await listGroupwork();
      setGroupworks(response.data);
    } catch (error) {
      console.error("Error fetching groupworks:", error);
    }
  };

  const fetchEmployees = async (groupworkId) => {
    try {
      const response = await listEmployeeGroupwork(groupworkId);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchGroupworks();
  }, []);

  useEffect(() => {
    if (groupworkId) {
      fetchEmployees(groupworkId);
    } else {
      setEmployees([]);
    }
  }, [groupworkId]);

  useEffect(() => {
    fetchData();
  }, [groupworkId, employeeId, year, month]);

  const resetFilters = async () => {
    setGroupworkId("");
    setEmployeeId("");
    setYear("");
    setMonth("");
    await fetchGroupworks(); // เรียกใช้ fetchGroupworks หลังจากรีเซ็ตฟิลเตอร์
    setEmployees([]); // รีเซ็ต employees เป็นอาร์เรย์ว่าง
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  return (
    <div className="w-full xl:w-full mt-4 shadow-md rounded-sm p-1 bg-white ">
      <div className="bg-green-800 rounded-sm flex justify-center p-2">
        <p className="text-gray-100">พนักงาน</p>
      </div>
      <div className="flex flex-wrap justify-end gap-4 p-2 text-sm">
        <div className="flex items-center gap-2">
          <p>กลุ่มงาน</p>
          <select
            value={groupworkId}
            onChange={(e) => setGroupworkId(e.target.value)}
            className="border rounded-sm px-2 py-1"
          >
            <option value="">เลือกกลุ่มงาน</option>
            {groupworks.map((groupwork) => (
              <option key={groupwork.id} value={groupwork.id}>
                {groupwork.GroupWorkname}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <p>พนักงาน</p>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="border rounded-sm px-2 py-1"
          >
            <option value="">เลือกพนักงาน</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.Employeename}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <p>ปี</p>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border rounded-sm px-2 py-1"
          >
            <option value="">เลือกปี</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <p>เดือน</p>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border rounded-sm px-2 py-1"
          >
            <option value="">เลือกเดือน</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <button onClick={resetFilters} className="bg-indigo-800 hover:bg-indigo-600  rounded-sm px-2 py-1 text-white">
          <LuRefreshCcw />
        </button>
      </div>

      <div className="p-2 text-sm">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-center text-xs text-gray-900 uppercase bg-green-200">
            <tr>
              <th scope="col" className="px-6 py-1">
                ชื่อพนักงาน
              </th>
              <th scope="col" className="px-6 py-1">
                กลุ่มงาน
              </th>
              <th scope="col" className="px-6 py-1">
                จำนวนงาน
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-900 text-center text-xs">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-6 py-1">{item.employeeName}</td>
                  <td className="px-6 py-1">{item.groupworkName}</td>
                  <td className="px-6 py-1">{item.workCount}</td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b">
                <td className="px-6 py-1" colSpan="3">
                  ไม่มีข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center p-2">
      <ExportPDFEM data={data} year={year} month={month} />
      </div>
    </div>
  );
};

export default EmployeeWork;
