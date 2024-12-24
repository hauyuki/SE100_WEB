import React from "react";
import AdminSidebar from "../components/Sidebar/AdminSidebar";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "dashboard";

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar activeItem={currentPath} setActiveItem={() => {}} />
      <div className="flex-1 flex flex-col">
        <Header
          currentPath={currentPath}
          userName="Admin"
          userRole="Quản trị viên"
        />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
