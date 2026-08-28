import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useTheme from "../hooks/useTheme";

const MainLayout = () => {
  const { __theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", __theme);
  }, [__theme]);

  return (
    <div className="d-flex min-vh-100 overflow-hidden bg-body text-body">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column vh-100 overflow-hidden">
        <Navbar />
        <main className="flex-grow-1 overflow-y-auto">
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
