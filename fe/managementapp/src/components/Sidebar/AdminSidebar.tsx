import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaWarehouse,
  FaChartBar,
  FaTags,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

interface AdminSidebarProps {
  activeItem: string;
  setActiveItem: (id: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeItem,
  setActiveItem,
}) => {
  const navigate = useNavigate();

  const sidebarItems: SidebarItem[] = [
    {
      id: "products",
      label: "Quản lý sản phẩm",
      icon: FaBox,
      path: "/admin/products",
    },
    {
      id: "inventory",
      label: "Quản lý nhập/xuất kho",
      icon: FaWarehouse,
      path: "/admin/import",
    },
    {
      id: "reports",
      label: "Quản lý báo cáo/kiểm toán",
      icon: FaChartBar,
      path: "/admin/reports",
    },
    { id: "tags", label: "Quản lý tag", icon: FaTags, path: "/admin/tags" },
    {
      id: "accounts",
      label: "Quản lý tài khoản",
      icon: FaUser,
      path: "/admin/accounts",
    },
    { id: "settings", label: "Cài đặt", icon: FaCog, path: "/admin/settings" },
  ];

  const handleItemClick = (item: SidebarItem) => {
    setActiveItem(item.id);
    navigate(item.path);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white border-r h-full py-6 flex flex-col">
      {/* Logo */}
      <div className="px-6 mb-8">
        <h1 className="text-2xl font-bold text-indigo-600">SWM</h1>
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-3">
        {sidebarItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg mb-1
              ${
                activeItem === item.id
                  ? "bg-indigo-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <item.icon
              className={`w-5 h-5 ${
                activeItem === item.id ? "text-white" : "text-gray-400"
              }`}
            />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-3 mt-auto">
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 cursor-pointer text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <FaSignOutAlt className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium">Đăng xuất</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
