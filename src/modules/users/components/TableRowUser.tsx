import { User } from "../types/User.types";
import { Role } from "../../roles/types/Role.types";
import TableRowActions from "../../../shared/components/TableRowActions";
import CopyableText from "../../../shared/components/CopyableText";

interface TableRowUserActions {
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

interface TableRowUserPermissions {
  isViewAllowed: boolean;
  isEditAllowed: boolean;
  isDeleteAllowed: boolean;
}

interface TableRowUserProps {
  user: User;
  index: number;
  roles: Role[];
  actions: TableRowUserActions;
  permissions: TableRowUserPermissions;
}

const TableRowUser = ({
  user,
  index,
  roles,
  actions,
  permissions: { isViewAllowed, isEditAllowed, isDeleteAllowed },
}: TableRowUserProps) => {
  const roleName = roles.find((role) => role.id === user.role)?.name ?? user.role;

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div>{user.name}</div>
        <div className="text-muted small">{user.address}</div>
      </td>
      <td>
        <CopyableText
          text={user.email}
          className="text-muted small contact-link d-block"
        />

        <CopyableText
          text={user.phone}
          className="text-muted small contact-link d-block"
        />
      </td>
      <td>
        <span className="badge text-bg-secondary">{roleName}</span>
      </td>
      <td className="text-end">
        <TableRowActions
          item={user}
          actions={actions}
          isViewAllowed={isViewAllowed}
          isEditAllowed={isEditAllowed}
          isDeleteAllowed={isDeleteAllowed}
          label={user.name}
        />
      </td>
    </tr>
  );
};

export default TableRowUser;
