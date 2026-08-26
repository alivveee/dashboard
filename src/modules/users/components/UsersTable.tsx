import { User } from "../types/User.types";
import useRoles from "../../roles/hooks/useRoles";
import TableShell from "../../../shared/components/TableShell";
import TableRowActions from "../../../shared/components/TableRowActions";
import CopyableText from "../../../shared/components/CopyableText";

interface UserTableActions {
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

interface UserTableProps {
  users: User[];
  actions: UserTableActions;
  isViewAllowed: boolean;
  isEditAllowed: boolean;
  isDeleteAllowed: boolean;
}

const UsersTable = ({
  users,
  actions,
  isViewAllowed,
  isEditAllowed,
  isDeleteAllowed,
}: UserTableProps) => {
  const roles = useRoles();

  return (
    <TableShell
      emptyMessage="No user data yet."
      searchPlaceholder="search by name..."
      headers={[
        "#",
        { content: "Personal Data", isSortable: true, isSearchable: true },
        { content: "Account", isSortable: true },
        { content: "Role", isSortable: true },
        { className: "text-end", content: "Actions" },
      ]}
      rows={users.map((user, index) => [
        index + 1,
        {
          sortValue: user.name,
          content: (
            <>
              <div>{user.name}</div>
              <div className="text-muted small">{user.address}</div>
            </>
          ),
        },
        {
          sortValue: user.email,
          content: (
            <>
              <CopyableText
                text={user.email}
                className="text-muted small contact-link d-block"
              />

              <CopyableText
                text={user.phone}
                className="text-muted small contact-link d-block"
              />
            </>
          ),
        },
        {
          sortValue:
            roles.find((role) => role.id === user.role)?.name ?? user.role,
          content: (
            <span className="badge text-bg-secondary">
              {roles.find((role) => role.id === user.role)?.name ?? user.role}
            </span>
          ),
        },
        {
          className: "text-end",
          content: (
            <TableRowActions
              item={user}
              actions={actions}
              isViewAllowed={isViewAllowed}
              isEditAllowed={isEditAllowed}
              isDeleteAllowed={isDeleteAllowed}
              label={user.name}
            />
          ),
        },
      ])}
    />
  );
};

export default UsersTable;
