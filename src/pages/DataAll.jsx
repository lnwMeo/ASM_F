import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import { listServiceWork } from "../api/Servicework";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const DataAll = () => {
  const [servicwork, setServicework] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12; // จำนวนรายการต่อหน้า

  const fetchdataservice = async () => {
    try {
      const response = await listServiceWork();
      setServicework(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdataservice();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = servicwork.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(servicwork.length / itemsPerPage);

  return (
    <div className="w-full rounded-sm shadow-md p-4 bg-white">
      <p className="text-2xl">ข้อมูลการให้บริการ</p>
      <div className="">
        <div className="relative overflow-x-auto border rounded-md mt-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-center text-xs md:text-xs xl:text-xs text-white uppercase bg-indigo-800 ">
              <tr>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">
                  ลำดับ
                </th>
                <th scope="col" className="px-6 py-3">
                  กลุ่มงานที่ให้บริการ
                </th>
                <th scope="col" className="px-6 py-3 ">
                  หน่วยงานที่รับบริการ
                </th>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">
                  ประเภทงานที่ให้บริการ
                </th>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">
                  พนักงานที่ให้บริการ
                </th>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">
                  วันที่ให้บริการ
                </th>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">
                  สถานะ
                </th>
                <th scope="col" className="px-6 py-3">
                  รายละเอียด
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-900 text-center text-xs md:text-xs xl:text-xs">
              {currentItems.map((servicwork, index) => (
                <tr key={servicwork.id} className="bg-white border-b">
                  <td className="px-6 py-3 hidden md:table-cell">{offset + index + 1}</td>
                  <td className="px-6 py-3">
                    <span className="rounded-md p-1">
                      {servicwork.groupwork.GroupWorkname}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {servicwork.affiliation.affiliationname}
                  </td>
                  <td className="px-6 py-3 hidden md:table-cell">
                    {servicwork.worktype.WorkTypename}
                  </td>
                  <td className="px-6 py-3 hidden md:table-cell">
                    {servicwork.ServiceWorkEmployee &&
                    servicwork.ServiceWorkEmployee.length > 0
                      ? servicwork.ServiceWorkEmployee.map(
                          (employee) => employee.employee.Employeename
                        ).join(", ")
                      : "ไม่มีข้อมูล"}
                  </td>
                  <td className="px-6 py-3 hidden md:table-cell">
                    {servicwork.serviceDate}
                  </td>
                  <td className="px-6 py-3 hidden md:table-cell">
                    {servicwork.statusconfirm ? (
                      <span className="bg-green-200 p-1 rounded-sm text-green-900 text-nowrap">
                        ยืนยันแล้ว
                      </span>
                    ) : (
                      <span className="bg-red-200 p-1 rounded-sm text-red-900 text-nowrap">
                        รอการยืนยัน
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-3">
                    <Link
                      to={`/detaildataall/${servicwork.id}`}
                      className="inline-block p-1 bg-blue-800 text-md rounded-sm text-white hover:bg-blue-900"
                    >
                      <TbListDetails />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center mt-4"}
          pageClassName={"mx-1"}
          pageLinkClassName={"px-3  border rounded-md text-gray-300 hover:bg-blue-500"} //หน้าตัวเลข
          previousClassName={"mx-1"}
          previousLinkClassName={"px-3  border rounded-md text-gray-300 hover:bg-blue-500"}
          nextClassName={"mx-1"}
          nextLinkClassName={"px-3  border rounded-md text-gray-300 hover:bg-blue-500"}
          breakClassName={"mx-1"}
          breakLinkClassName={"px-3  border rounded-md text-gray-300 hover:bg-blue-500"}
          activeClassName={"bg-blue-900 rounded-md text-white"}
        />
      </div>
    </div>
  );
};

export default DataAll;