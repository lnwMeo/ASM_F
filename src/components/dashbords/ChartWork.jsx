import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto"; // นำเข้า Chart.js
import { getServiceSummary } from "../../api/Servicework";
import ChartDataLabels from "chartjs-plugin-datalabels"; // นำเข้า ChartDataLabels
import { ThreeDots } from "react-loader-spinner";
Chart.register(ChartDataLabels); // ลงทะเบียน ChartDataLabels

const ChartWork = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // สถานะการโหลด
  const chartRefs = useRef({}); // ใช้ Object สำหรับจัดการแผนภูมิหลายตัว

  const fetchData = async (month, year) => {
    try {
      const response = await getServiceSummary(month, year);
      const sortedData = response.data.sort(
        (a, b) => b.totalJobs - a.totalJobs
      );
      setData(sortedData);
      setLoading(false); // ปิดสถานะการโหลดเมื่อข้อมูลถูกดึงมาแล้ว
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const groupedData = data.reduce((acc, item) => {
    const group = acc.find((g) => g.groupworkId === item.groupworkId);
    if (group) {
      const existingAffiliation = group.data.find(
        (aff) => aff.affiliationname === item.affiliationname
      );
      if (existingAffiliation) {
        existingAffiliation.totalJobs += item.totalJobs;
        existingAffiliation.totalBudget += item.totalBudget;
        existingAffiliation.confirmedJobs += item.confirmedJobs;
      } else {
        group.data.push(item);
        group.chartData.labels.push(item.affiliationname);
        group.chartData.datasets[0].data.push(item.totalBudget);
      }
      group.totalJobs += item.totalJobs;
      group.totalBudget += item.totalBudget;
      group.confirmedJobs += item.confirmedJobs;
    } else {
      acc.push({
        groupworkId: item.groupworkId,
        groupname: item.groupname,
        data: [item],
        chartData: {
          labels: [item.affiliationname],
          datasets: [
            {
              data: [item.totalBudget],
              backgroundColor: [
                "#FF6384",
                "#FFCE56",
                "#2694AB",
                "#4BC0C0",
                "#36F1CD",
                "#36A2EB",
                "#4C6085",
              ],
            },
          ],
        },
        totalJobs: item.totalJobs,
        totalBudget: item.totalBudget,
        confirmedJobs: item.confirmedJobs,
      });
    }
    return acc;
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 100,
        bottom: 100,
        left: 100,
        right: 100,
      },
    },
    plugins: {
      legend: {
        display: false, // ซ่อน legend ด้านบน
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value.toLocaleString()} บาท`;
          },
        },
        position: "nearest", // ให้ tooltip ชี้ออกจากแผนภูมิ
      },
      datalabels: {
        color: "#000",
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label} `;
        },
        anchor: "end",
        align: "end",
        offset: 10,
        borderRadius: 2,
        backgroundColor: (context) => {
          return context.dataset.backgroundColor;
        },
        font: {
          size: "11",
        },
        rotation: 0,
        clamp: true, // ป้องกันไม่ให้ป้ายทับกัน
        overlap: false, // ป้องกันการทับซ้อนของป้าย
      },
    },
    cutout: "70%",
  };

  // ลบแผนภูมิเดิมก่อนสร้างใหม่
  useEffect(() => {
    fetchData(month, year);

    return () => {
      Object.values(chartRefs.current).forEach((chart) => {
        if (chart) chart.destroy();
      });
      chartRefs.current = {};
    };
  }, [month, year]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  return (
    <>
      <div className="flex justify-center flex-wrap gap-2 bg-white my-2 p-1">
        <div>
          <label>ปี: </label>
          <select
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
        <div>
          <label>เดือน: </label>
          <select
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
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4338ca"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row gap-2">
          {groupedData.length > 0 ? (
            groupedData.map((group) => (
              <div
                key={group.groupworkId}
                className="w-full xl:w-2/4 shadow-md rounded-sm p-1 bg-white flex flex-col"
              >
                <div className="bg-indigo-800 rounded-sm flex justify-center p-2">
                  <p className="text-gray-100">กลุ่มงาน {group.groupname}</p>
                </div>

                <div className="w-full h-96">
                  <canvas
                    ref={(canvas) => {
                      if (canvas && !chartRefs.current[group.groupworkId]) {
                        const chartInstance = new Chart(canvas, {
                          type: "doughnut",
                          data: group.chartData,
                          options: options,
                        });
                        chartRefs.current[group.groupworkId] = chartInstance;
                      }
                    }}
                  />
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-center text-xs text-gray-900 uppercase bg-indigo-200">
                    <tr>
                      <th scope="col" className="px-6 py-1">
                        หน่วยงานที่รับบริการ
                      </th>
                      <th scope="col" className="px-6 py-1">
                        จำนวนครั้ง
                      </th>
                      <th scope="col" className="px-6 py-1">
                        งบประมาณรวม (หน่วยงาน)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-900 text-center text-xs">
                    {group.data.map((item, index) => (
                      <tr
                        key={`${item.affiliationname}-${index}`}
                        className="bg-white border-b"
                      >
                        <td className="px-6 py-1">{item.affiliationname}</td>
                        <td className="px-6 py-1">{item.totalJobs}</td>
                        <td className="px-6 py-1">
                          {item.totalBudget.toLocaleString()} บาท
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="p-2 text-sm mt-auto">
                  <div className="flex justify-between">
                    <p className="text-gray-700">งบประมาณรวมการให้บริการ</p>
                    <p className="text-yellow-700 font-semibold">
                      {group.totalBudget.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">จำนวนงานทั้งหมด</p>
                    <p className="text-green-700 font-semibold">
                      {group.totalJobs}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">งานที่ยืนยันแล้ว</p>
                    <p className="text-indigo-700 font-semibold">
                      {group.confirmedJobs}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center text-gray-500 text-sm p-4 bg-white shadow-md rounded-sm">
              ไม่มีข้อมูล
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChartWork;
