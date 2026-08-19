import { NavLink } from "react-router-dom";
import { IconChevronDown } from "../components/icons/Icons";
import { isRouteActive } from "../../routes/routes.helper";
import { RouteConfig } from "../types/Route.types";

interface SidebarMenuItemProps {
  route: RouteConfig;
  pathname: string;
}

const SidebarMenuItem = ({ route, pathname }: SidebarMenuItemProps) => {
  if (!route.children?.length) {
    return (
      <li className="nav-item">
        <NavLink
          to={route.path}
          end={route.path === "/"}
          title={route.label}
          className={({ isActive }) =>
            `nav-link d-flex align-items-center gap-2 ${
              isActive ? "active" : "text-body-secondary"
            }`
          }
        >
          <route.icon className="flex-shrink-0" />
          <span className="sidebar-label">{route.label}</span>
        </NavLink>
      </li>
    );
  }

  const isActive = isRouteActive(route, pathname);
  const collapseId = `sidebar-submenu-${route.path.replace(/\//g, "-")}`;

  return (
    <li className="nav-item">
      <button
        type="button"
        className="nav-link sidebar-toggle-btn d-flex align-items-center gap-2 w-100 text-body-secondary"
        data-bs-toggle="collapse"
        data-bs-target={`#${collapseId}`}
        aria-expanded={isActive}
        title={route.label}
      >
        <route.icon className="flex-shrink-0" />
        <span className="sidebar-label flex-grow-1 text-start">
          {route.label}
        </span>
        <IconChevronDown className="sidebar-label sidebar-chevron flex-shrink-0" />
      </button>
      <div className={`collapse ${isActive ? "show" : ""}`} id={collapseId}>
        <ul className="nav nav-pills flex-column gap-2 sidebar-submenu">
          {route.children.map((child: RouteConfig) => (
            <SidebarMenuItem
              key={child.path}
              route={child}
              pathname={pathname}
            />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default SidebarMenuItem;
