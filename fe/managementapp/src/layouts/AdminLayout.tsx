import React from "react";
import { useLocation } from "react-router-dom";
import AdminSidebar from "../components/Sidebar/AdminSidebar";
import Header from "./components/Header";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").slice(1).join("/");

  return (
    <div className="flex h-screen ">
      <AdminSidebar currentPath={currentPath} />
      <div className="flex-1 flex flex-col">
        <Header currentPath={currentPath} />
        <main className="flex-1 overflow-y-auto p-5 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
