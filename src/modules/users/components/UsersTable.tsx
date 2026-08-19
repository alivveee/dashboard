import { User } from "../types/User.types";
import useRoles from "../../roles/hooks/useRoles";
import DataTable from "../../../shared/components/DataTable";

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
    <DataTable
      items={users}
      emptyMessage="Belum ada data user."
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      canView={canView}
      canEdit={canEdit}
      canDelete={canDelete}
      getItemLabel={(user) => user.name}
      columns={[
        { header: "Nama", key: "name", sortable: true },
        { header: "Email", key: "email", sortable: true },
        { header: "Alamat", key: "address", sortable: true },
        {
          header: "Role",
          sortable: true,
          sortValue: (user) =>
            roles.find((role) => role.id === user.role)?.name ?? user.role,
          render: (user) =>
            roles.find((role) => role.id === user.role)?.name ?? user.role,
        },
      ]}
    />
  );
};

export default UsersTable;
