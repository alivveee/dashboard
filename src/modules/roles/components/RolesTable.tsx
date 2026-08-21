import { Role } from "../types/Role.types";
import TableShell from "../../../shared/components/TableShell";
import TableRowActions from "../../../shared/components/TableRowActions";

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
  <TableShell
    emptyMessage="No role data yet."
    headers={[
      "#",
      { content: "Role Name", sortable: true },
      { content: "Description", sortable: true },
      { content: "Permission", sortable: true },
      { className: "text-end", content: "Actions" },
    ]}
    rows={roles.map((role, index) => [
      index + 1,
      role.name,
      role.description,
      {
        sortValue: Object.keys(role.grants).length,
        content: (
          <span className="badge text-bg-secondary">
            {Object.keys(role.grants).length} module
          </span>
        ),
      },
      {
        className: "text-end",
        content: (
          <TableRowActions
            item={role}
            onEdit={onEdit}
            onDelete={onDelete}
            canEdit={canEdit}
            canDelete={canDelete}
            label={role.name}
          />
        ),
      },
    ])}
  />
);

export default RolesTable;
