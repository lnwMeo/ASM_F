
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/admin/SidebarAdmin";



const LayoutAdmin = () => {
  
  return (
    <>
    <SidebarAdmin/>
      <main className="p-4 sm:ml-60 font-family">
        <Outlet />
      </main>
    </>
  );
};

export default LayoutAdmin;
