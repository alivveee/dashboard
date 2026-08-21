import { User } from "../types/User.types";
import useRoles from "../../roles/hooks/useRoles";
import TableShell from "../../../shared/components/TableShell";
import TableRowActions from "../../../shared/components/TableRowActions";

interface UserTableProps {
  users: User[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

const UsersTable = ({
  users,
  onView,
  onEdit,
  onDelete,
  canView,
  canEdit,
  canDelete,
}: UserTableProps) => {
  const roles = useRoles();

  return (
    <TableShell
      emptyMessage="No user data yet."
      searchPlaceholder="search by name..."
      headers={[
        "#",
        { content: "Name", sortable: true, searchable: true },
        { content: "Email", sortable: true },
        { content: "Address", sortable: true },
        { content: "Role", sortable: true },
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
              canView={canView}
              canEdit={canEdit}
              canDelete={canDelete}
              label={user.name}
            />
          ),
        },
      ])}
    />
  );
};

export default UsersTable;
