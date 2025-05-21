import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutDashbord from "../layouts/LayoutDashbord";
import Dashbord from "../pages/Dashbord";
import PageForm from "../pages/PageForm";
import DataAll from "../pages/DataAll";
import DetailDataAll from "../pages/DetailDataAll";

import LayoutAdmin from "../layouts/LayoutAdmin";
import Adminindex from "../pages/pagesAdmin/Adminindex";
import AdminSettingServiceType from "../pages/pagesAdmin/AdminSettingServiceType";
import AdminSettingGroupEmployee from "../pages/pagesAdmin/AdminSettingGroupEmployee";
import AdminSettingGroupWork from "../pages/pagesAdmin/AdminSettingGroupWork";
import AdminSettingAdmin from "../pages/pagesAdmin/AdminSettingAdmin";
import AdminSettingStatusRecipient from "../pages/pagesAdmin/AdminSettingStatusRecipient";
import AdminSettingQuestion from "../pages/pagesAdmin/AdminSettingQuestion";
import LoginAD from "../pages/LoginAD";
import ErrorPage from "../pages/ErrorPage";

import ProtectRouter from "./ProtectRouter";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutDashbord />,
    errorElement: <ErrorPage />, // เพิ่ม errorElement
    children: [
      { index: true, element: <Dashbord /> },
      { path: "/pageform", element: <PageForm /> },
      { path: "/dataall", element: <DataAll /> },
      { path: "/detaildataall/:id", element: <DetailDataAll /> },
      { path: "loginAD", element: <LoginAD /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectRouter element={<LayoutAdmin />} />,
    errorElement: <ErrorPage />, // เพิ่ม errorElement
    children: [
      { index: true, element: <Adminindex /> },
      {
        path: "settingstatusrecipient",
        element: <AdminSettingStatusRecipient />,
      },
      { path: "settinggroupwork", element: <AdminSettingGroupWork /> },
      { path: "settinggroupemployee", element: <AdminSettingGroupEmployee /> },
      { path: "settingservicetype", element: <AdminSettingServiceType /> },
      { path: "settingquestion", element: <AdminSettingQuestion /> },
      { path: "settingserviceadmin", element: <AdminSettingAdmin /> },
    ],
  },
]);

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
