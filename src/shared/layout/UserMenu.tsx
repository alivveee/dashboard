import { IconLogOut, IconUser } from "../components/icons/Icons";
import { Session } from "../../modules/auth/hooks/useAuth";

interface UserMenuProps {
  session: Session | null;
  onLogout: () => void;
}

const UserMenu = ({ session, onLogout }: UserMenuProps) => (
  <div className="dropdown">
    <button
      type="button"
      className="btn btn-sidebar-toggle d-flex align-items-center gap-2 px-2"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <IconUser />
      <span className="d-none d-sm-inline">{session?.name}</span>
    </button>
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <span className="dropdown-item-text text-muted small">
          {session?.email}
        </span>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <button
          type="button"
          className="dropdown-item d-flex align-items-center gap-2"
          onClick={onLogout}
        >
          <IconLogOut />
          Log out
        </button>
      </li>
    </ul>
  </div>
);

export default UserMenu;
