import Logo from "./../assets/images/LOGO.png";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="fixed w-full z-20 top-0 start-0 bg-indigo-900 shadow-sm font-family">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          {/* LOGO */}
          <div className="flex gap-2 items-center">
            <img src={Logo} alt="Logo" className="size-10" />
            <div>
              <p className="font-medium text-white text-xl">Comcenter</p>
              <p className="font-normal text-white text-sm">Assessment</p>
            </div>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg xl:hidden hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Links for Large Screens */}
          <div className="hidden xl:flex gap-4 ">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white hover:text-gray-300 font-medium underline underline-offset-4  decoration-white decoration-2"
                  : "text-white hover:text-gray-300 font-medium "
              }
              to={"/"}
            >
              แดชบอร์ด
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white hover:text-gray-300 font-medium underline underline-offset-4  decoration-white decoration-2"
                  : "text-white hover:text-gray-300  font-medium "
              }
              to={"/pageform"}
            >
              กรอกแบบฟอร์ม
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white hover:text-gray-300 font-medium underline underline-offset-4  decoration-white decoration-2"
                  : "text-white hover:text-gray-300  font-medium "
              }
              to={"/dataall"}
            >
              ข้อมูลการให้บริการ
            </NavLink>
          </div>

          {/* Links for Small Screens */}
          <div
            id="navbar-sticky"
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full xl:hidden mt-4  `}
          >
            <ul className="flex flex-col  gap-2 p-4 items-end ">
              <li>
                <Link
                  to="/"
                  className="block text-white hover:text-gray-300 "
                  onClick={() => setIsMenuOpen(false)}
                >
                  แดชบอร์ด
                </Link>
              </li>
              <li>
                <Link
                  to="/pageform"
                  className="block text-white hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  กรอกแบบฟอร์ม
                </Link>
              </li>
              <li>
                <Link
                  to="/dataall"
                  className="block text-white hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ข้อมูลการให้บริการ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNav;
