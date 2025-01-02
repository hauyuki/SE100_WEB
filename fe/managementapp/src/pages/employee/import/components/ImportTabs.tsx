import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { Role } from "../../../../models/Auth";

const ImportTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuthContext();
  const tabs = [
    {
      path: "/import",
      adminPath: "/admin/import",
      label: "Danh sách phiếu nhập",
    },
    {
      path: "/export",
      adminPath: "/admin/export",
      label: "Danh sách phiếu xuất",
    },
    {
      path: "/shipping",
      adminPath: "/admin/shipping",
      label: "Danh sách vận chuyển",
    },
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            className={`py-4 px-6 font-medium rounded-t-lg transition-all duration-300 ${
              currentPath === tab.path || currentPath === tab.adminPath
                ? "bg-indigo-500 text-white"
                : "text-gray-600 hover:bg-indigo-50"
            }`}
            onClick={() => {
              if (user?.role === Role.ADMIN_ROLE) {
                navigate(tab.adminPath);
              } else {
                navigate(tab.path);
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ImportTabs;
