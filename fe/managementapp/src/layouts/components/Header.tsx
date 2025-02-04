import React, { useState, useRef, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { Role } from "../../models/Auth";

interface HeaderProps {
  currentPath?: string;
  setCurrentPath?: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPath = "dashboard" }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Convert path to title (first letter uppercase)
  const getTitle = (path: string) => {
    // Admin routes
    if (path.startsWith("admin/")) {
      const adminPath = path.replace("admin/", "");

      if (adminPath === "dashboard") return "Dashboard";
      if (adminPath.startsWith("product/")) return "Chi tiết sản phẩm";
      if (adminPath === "products") return "Quản lý sản phẩm";
      if (adminPath === "profile") return "Thông tin cá nhân";
      if (
        adminPath.startsWith("import") ||
        adminPath.startsWith("export") ||
        adminPath === "shipping"
      )
        return "Quản lý xuất nhập hàng";
      if (adminPath.startsWith("reports")) return "Báo cáo";
      if (adminPath.startsWith("report")) return "Báo cáo chi tiết";
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
    if (path === "profile") {
      return "Thông tin cá nhân";
    }

    return path;
  };

  const handleLogout = () => {
    // Close dropdown menu
    setIsDropdownOpen(false);
    // Navigate to login page
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-6 bg-white border-b z-50">
      {/* Left side - Title */}
      <h1 className="text-4xl font-semibold text-indigo-500">
        {getTitle(currentPath)}
      </h1>

      {/* Right side - User info */}
      <div className="flex items-center gap-3 relative">
        <div className="text-right">
          <p className="font-medium text-gray-800">{user?.name}</p>
          <p className="text-sm text-gray-500">
            {user?.role === Role.EMPLOYEE_ROLE ? "Nhân viên" : "Quản lý"}
          </p>
        </div>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
        >
          <UserCircleIcon className="h-8 w-8 text-gray-400" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100 transform transition-all duration-200 ease-out"
          >
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsDropdownOpen(false)}
            >
              Thông tin cá nhân
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
