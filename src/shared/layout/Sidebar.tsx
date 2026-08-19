import { useLocation } from "react-router-dom";
import { filterRoutesByPermission } from "../helpers/routes.helper";
import useAuth from "../../modules/auth/hooks/useAuth";
import useSidebar from "../hooks/useSidebar";
import { routes } from "../../routes/routes.config";
import SidebarMenuItem from "./SidebarMenuItem";

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const { pathname } = useLocation();
  const { hasPermission } = useAuth();

  const visibleRoutes = filterRoutesByPermission(routes, hasPermission);

  return (
    <aside
      className={`bg-body-tertiary border-end min-vh-100 sidebar ${
        isOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <div className="sidebar-brand d-flex align-items-center justify-content-center gap-2 p-3 h3 mb-0">
        <span className="sidebar-label">GX App</span>
        <span className="sidebar-brand-short">GA</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav p-3 text-nowrap">
        <ul className="nav nav-pills flex-column gap-2">
          {visibleRoutes.map((route) => (
            <SidebarMenuItem
              key={route.path}
              route={route}
              pathname={pathname}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
