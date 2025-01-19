import MainNav from "../components/MainNav";
import { Outlet } from "react-router-dom";
const LayoutDashbord = () => {
  return (
    <>
  
        <MainNav />
        <main className="h-full px-4 py-4 mx-auto mt-14 max-w-screen-xl font-family">
          <Outlet />
        </main>
    
    </>
  );
};

export default LayoutDashbord;
