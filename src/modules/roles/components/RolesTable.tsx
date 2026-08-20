import { Role } from "../types/Role.types";
import DataTable from "../../../shared/components/DataTable";

interface RolesTableProps {
  roles: Role[];
  onEdit: (item: Role) => void;
  onDelete: (item: Role) => void;
  canEdit: boolean;
  canDelete: boolean;
}

const RolesTable = ({
  roles,
  onEdit,
  onDelete,
  canEdit,
  canDelete,
}: RolesTableProps) => (
  <DataTable
    items={roles}
    emptyMessage="No role data yet."
    onEdit={onEdit}
    onDelete={onDelete}
    canEdit={canEdit}
    canDelete={canDelete}
    getItemLabel={(role) => role.name}
    columns={[
      { header: "Role Name", key: "name", sortable: true },
      { header: "Description", key: "description", sortable: true },
      {
        header: "Permission",
        sortable: true,
        sortValue: (role) => Object.keys(role.grants).length,
        render: (role) => (
          <span className="badge text-bg-secondary">
            {Object.keys(role.grants).length} module
          </span>
        ),
      },
    ]}
  />
);

export default RolesTable;
