import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ImportTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { path: "/import", label: "Danh sách phiếu nhập" },
    { path: "/export", label: "Danh sách phiếu xuất" },
    { path: "/shipping", label: "Danh sách vận chuyển" },
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            className={`py-4 px-6 font-medium rounded-t-lg transition-all duration-300 ${
              currentPath === tab.path
                ? "bg-indigo-500 text-white"
                : "text-gray-600 hover:bg-indigo-50"
            }`}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ImportTabs;
