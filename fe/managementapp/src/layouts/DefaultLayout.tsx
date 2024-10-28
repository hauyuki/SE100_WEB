import Header from "./components/Header";
import { LeftSidebar } from "./components/LeftSidebar";
import { useLocation } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || "dashboard"; // Remove leading slash and default to "dashboard"

  return (
    <div className="flex h-screen">
      {/* Fixed sidebar */}
      <div className="w-64 flex-shrink-0">
        <LeftSidebar currentPath={currentPath} />
      </div>

      <div className="flex flex-col flex-1">
        {/* Header at the top */}
        <Header currentPath={currentPath} />

        {/* Scrollable main content */}
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default DefaultLayout;
