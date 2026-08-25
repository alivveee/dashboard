import { Role } from "../types/Role.types";
import TableShell from "../../../shared/components/TableShell";
import TableRowActions from "../../../shared/components/TableRowActions";

interface RolesTableActions {
  onEdit: (item: Role) => void;
  onDelete: (item: Role) => void;
}

interface RolesTableProps {
  roles: Role[];
  actions: RolesTableActions;
  isEditAllowed: boolean;
  isDeleteAllowed: boolean;
}

const RolesTable = ({
  roles,
  actions,
  isEditAllowed,
  isDeleteAllowed,
}: RolesTableProps) => (
  <TableShell
    emptyMessage="No role data yet."
    headers={[
      "#",
      { content: "Role Name", isSortable: true },
      { content: "Description", isSortable: true },
      { content: "Permission", isSortable: true },
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
            actions={actions}
            isEditAllowed={isEditAllowed}
            isDeleteAllowed={isDeleteAllowed}
            label={role.name}
          />
        ),
      },
    ])}
  />
);

export default RolesTable;
