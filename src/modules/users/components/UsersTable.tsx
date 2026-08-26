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
        { content: "Name", isSortable: true, isSearchable: true },
        { content: "Email", isSortable: true },
        { content: "Phone", isSortable: true },
        { content: "Address", isSortable: true },
        { content: "Role", isSortable: true },
        { className: "text-end", content: "Actions" },
      ]}
      rows={users.map((user, index) => [
        index + 1,
        user.name,
        {
          sortValue: user.email,
          content: <CopyableText text={user.email} />,
        },
        {
          sortValue: user.phone,
          content: <CopyableText text={user.phone} />,
        },
        user.address,
        roles.find((role) => role.id === user.role)?.name ?? user.role,
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
