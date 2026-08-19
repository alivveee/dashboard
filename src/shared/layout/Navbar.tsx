import { useNavigate, useLocation } from "react-router-dom";
import useSidebar from "../hooks/useSidebar";
import useTheme from "../hooks/useTheme";
import useAuth from "../../modules/auth/hooks/useAuth";
import { IconMenu, IconMoon, IconSun } from "../components/icons/Icons";
import { findActiveRoute } from "../../routes/routes.helper";
import { routes } from "../../routes/routes.config";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { toggle } = useSidebar();
  const { theme, toggle: toggleTheme } = useTheme();
  const { session, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const activeRoute = findActiveRoute(routes, pathname);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar bg-body-tertiary border-bottom">
      <div className="container-fluid">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn btn-sidebar-toggle p-2"
            onClick={toggle}
            aria-label="Toggle sidebar"
          >
            <IconMenu />
          </button>
          <span className="navbar-brand mb-0 fw-semibold">
            {activeRoute?.label}
          </span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-sidebar-toggle p-2"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <IconSun /> : <IconMoon />}
          </button>

          <UserMenu session={session} onLogout={handleLogout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
