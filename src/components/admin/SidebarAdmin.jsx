import logo from "../../assets/images/LOGO.png";
import { RiLogoutBoxLine } from "react-icons/ri";
import { LuSettings } from "react-icons/lu";
import { TbSettingsBolt } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { TbSettingsQuestion } from "react-icons/tb";
import { RiUserSettingsLine } from "react-icons/ri";
import useAsmStore from "../../store/asm-store";
import { useState } from "react";
const SidebarAdmin = () => {
  const actionLogout = useAsmStore((state) => state.actionLogout);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    actionLogout();
  };

  return (
    <>
      <button
        onClick={handleToggleSidebar}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            // clip-rule="evenodd"
            // fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-60 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-gray-900`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-2 overflow-y-auto bg-gray-900 font-family">
          <div className="p-2 flex justify-start gap-2 items-center">
            <img src={logo} alt="" className="size-10" />
            <div className="">
              <p className="text-white text-2xl font-semibold">Comcenter</p>
              <p className="text-white text-sm">Assessment</p>
            </div>
            <button
              onClick={handleToggleSidebar}
              aria-controls="default-sidebar"
              type="button"
              className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  // clip-rule="evenodd"
                  // fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
          </div>
          <ul className="space-y-2">
            <div className="mt-2">
              <p className="text-white">ผู้รับบริการ</p>
            </div>
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive && location.pathname === "/admin"
                    ? "flex items-center p-2 text-white rounded-lg bg-indigo-700 group"
                    : "flex items-center p-2 text-white rounded-lg hover:bg-indigo-700 group"
                }
              >
                <LuSettings className="w-5 h-5 text-white transition duration-75 group-hover:text-white" />
                <span className="ms-3">
                  ตั้งค่า สังกัด คณะ / หน่วยงาน / สำนัก
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"settingstatusrecipient"}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-white rounded-lg bg-indigo-700  group"
                    : "flex items-center p-2 text-white rounded-lg   hover:bg-indigo-700  group"
                }
              >
                <LuSettings className="w-5 h-5 text-white transition duration-75 group-hover:text-white" />
                <span className="ms-3">ตั้งค่า สถานะ (คำนำหน้า)</span>
              </NavLink>
            </li>
            <div className="mt-2">
              <p className="text-white">ผู้ให้บริการ</p>
            </div>
            <li>
              <NavLink
                to={"settinggroupwork"}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-white rounded-lg bg-indigo-700  group"
                    : "flex items-center p-2 text-white rounded-lg   hover:bg-indigo-700  group"
                }
              >
                <TbSettingsBolt className="w-5 h-5 text-white transition duration-75  group-hover:text-white " />
                <span className="ms-3">ตั้งค่ากลุ่มงาน</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"settinggroupemployee"}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-white rounded-lg bg-indigo-700  group"
                    : "flex items-center p-2 text-white rounded-lg   hover:bg-indigo-700  group"
                }
              >
                <TbSettingsBolt className="w-5 h-5 text-white transition duration-75  group-hover:text-white " />
                <span className="ms-3">ตั้งค่ากลุ่มพนักงาน</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"settingservicetype"}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-white rounded-lg bg-indigo-700  group"
                    : "flex items-center p-2 text-white rounded-lg   hover:bg-indigo-700  group"
                }
              >
                <TbSettingsBolt className="w-5 h-5 text-white transition duration-75  group-hover:text-white " />
                <span className="ms-3">ตั้งค่ากลุ่มประเภทงานที่ให้บริการ</span>
              </NavLink>
            </li>
            <div className="mt-2">
              <p className="text-white">จัดการคำถามการให้บริการ</p>
            </div>
            <li>
              <NavLink
                to="settingquestion"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-white rounded-lg bg-indigo-700 group"
                    : "flex items-center p-2 text-white rounded-lg hover:bg-indigo-700 group"
                }
              >
                <TbSettingsQuestion className="w-5 h-5 text-white transition duration-75 group-hover:text-white" />
                <span className="ms-3">ตั้งค่า คำถามการให้บริการ</span>
              </NavLink>
            </li>
            <div className="mt-2">
              <p className="text-white">จัดการแอดมิน</p>
            </div>
            <li>
              <NavLink
                to="settingserviceadmin"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-white rounded-lg bg-indigo-700 group"
                    : "flex items-center p-2 text-white rounded-lg hover:bg-indigo-700 group"
                }
              >
                <RiUserSettingsLine className="w-5 h-5 text-white transition duration-75 group-hover:text-white" />
                <span className="ms-3">ตั้งค่า แอดมิน</span>
              </NavLink>
            </li>

            <div className="mt-2">
              <hr />
            </div>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 text-white rounded-lg  hover:bg-indigo-700 w-full group"
              >
                <RiLogoutBoxLine className="w-5 h-5 text-white transition duration-75  group-hover:text-white " />
                <span className="ms-3">ออกจากระบบ</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SidebarAdmin;
