import { LeftSidebar } from "./components/LeftSidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative flex h-full w-full mx-auto overflow-auto">
      <LeftSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};
export default DefaultLayout;
