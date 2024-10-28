import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  currentPath?: string;
  userName?: string;
  userRole?: string;
}

const Header: React.FC<HeaderProps> = ({
  currentPath = "dashboard",
  userName = "Bích Huyền",
  userRole = "Nhân viên",
}) => {
  // Convert path to title (first letter uppercase)
  const title = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  return (
    <header className="flex justify-between items-center p-6 bg-white border-b z-50">
      {/* Left side - Title */}
      <h1 className="text-4xl font-semibold text-indigo-500">{title}</h1>

      {/* Right side - User info */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-medium text-gray-800">{userName}</p>
          <p className="text-sm text-gray-500">{userRole}</p>
        </div>
        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
          <UserCircleIcon className="h-8 w-8 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
