import { User } from "../types/User.types";
import useRoles from "../../roles/hooks/useRoles";
import TableShell from "../../../shared/components/TableShell";
import TableRowUser from "./TableRowUser";

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
  const roleName = (user: User) =>
    roles.find((role) => role.id === user.role)?.name ?? user.role;

  return (
    <TableShell
      emptyMessage="No user data yet."
      searchPlaceholder="search by name..."
      rows={users}
      headers={[
        "#",
        {
          content: "Personal Data",
          isSortable: true,
          isSearchable: true,
          sortValue: (user) => user.name,
        },
        { content: "Account", isSortable: true, sortValue: (user) => user.email },
        { content: "Role", isSortable: true, sortValue: roleName },
        { className: "text-end", content: "Actions" },
      ]}
    >
      {(pagedUsers, startIndex) =>
        pagedUsers.map((user, index) => (
          <TableRowUser
            key={user.id}
            user={user}
            index={startIndex + index}
            roles={roles}
            actions={actions}
            permissions={{ isViewAllowed, isEditAllowed, isDeleteAllowed }}
          />
        ))
      }
    </TableShell>
  );
};

export default UsersTable;
