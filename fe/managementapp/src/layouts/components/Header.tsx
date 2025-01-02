import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../../contexts/AuthContext";
import { Role } from "../../models/Auth";

interface HeaderProps {
  currentPath?: string;
}

const Header: React.FC<HeaderProps> = ({ currentPath = "dashboard" }) => {
  const { user } = useAuthContext();
  // Convert path to title (first letter uppercase)
  const getTitle = (path: string) => {
    // Admin routes
    if (path.startsWith("admin/")) {
      const adminPath = path.replace("admin/", "");

      if (adminPath === "dashboard") return "Dashboard";
      if (adminPath.startsWith("product/")) return "Chi tiết sản phẩm";
      if (adminPath === "products") return "Quản lý sản phẩm";
      if (
        adminPath.startsWith("import") ||
        adminPath.startsWith("export") ||
        adminPath === "shipping"
      )
        return "Quản lý xuất nhập hàng";
      if (adminPath.startsWith("reports")) return "Báo cáo";
      if (adminPath === "audit") return "Kiểm toán";
      if (adminPath === "tags") return "Quản lý tag";
      if (adminPath === "accounts") return "Quản lý tài khoản";
      if (adminPath === "settings") return "Cài đặt";
    }

    // Employee routes
    if (path === "dashboard") return "Dashboard";
    if (path === "product") return "Quản lý sản phẩm";
    if (path.startsWith("import/"))
      return `Chi tiết phiếu nhập #${path.split("/")[1]}`;
    if (path.startsWith("export/"))
      return `Chi tiết phiếu xuất #${path.split("/")[1]}`;
    if (path === "import" || path === "export" || path === "shipping")
      return "Quản lý xuất nhập hàng";
    if (path === "report") return "Báo cáo";
    if (path === "report/generate") return "Tạo báo cáo";
    if (path === "audit") return "Kiểm toán";
    if (path === "tag") return "Tag";

    return path;
  };

  return (
    <header className="flex justify-between items-center p-6 bg-white border-b z-50">
      {/* Left side - Title */}
      <h1 className="text-4xl font-semibold text-indigo-500">
        {getTitle(currentPath)}
      </h1>

      {/* Right side - User info */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-medium text-gray-800">{user?.name}</p>
          <p className="text-sm text-gray-500">
            {user?.role === Role.EMPLOYEE_ROLE ? "Nhân viên" : "Quản lý"}
          </p>
        </div>
        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
          <UserCircleIcon className="h-8 w-8 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
