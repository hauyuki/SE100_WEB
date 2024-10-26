import { LeftSidebar } from "./components/LeftSidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative flex h-full w-full mx-auto overflow-auto">
      {children}
    </div>
  );
};
export default DefaultLayout;
