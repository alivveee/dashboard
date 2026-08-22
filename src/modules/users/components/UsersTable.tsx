import { User } from "../types/User.types";
import useRoles from "../../roles/hooks/useRoles";
import TableShell from "../../../shared/components/TableShell";
import TableRowActions from "../../../shared/components/TableRowActions";

interface UserTableProps {
  users: User[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  isViewAllowed: boolean;
  isEditAllowed: boolean;
  isDeleteAllowed: boolean;
}

const UsersTable = ({
  users,
  onView,
  onEdit,
  onDelete,
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
        { content: "Name", isSortable: true, isSearchable: true },
        { content: "Email", isSortable: true },
        { content: "Address", isSortable: true },
        { content: "Role", isSortable: true },
        { className: "text-end", content: "Actions" },
      ]}
      rows={users.map((user, index) => [
        index + 1,
        user.name,
        user.email,
        user.address,
        roles.find((role) => role.id === user.role)?.name ?? user.role,
        {
          className: "text-end",
          content: (
            <TableRowActions
              item={user}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
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
