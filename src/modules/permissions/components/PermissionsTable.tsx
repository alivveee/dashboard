import { Link } from "react-router-dom";
import { Permission } from "../../../shared/types/Permission.types";
import {
  isActionActive,
  PERMISSION_ACTION_BADGE_CLASS,
  PERMISSION_ACTION_LABEL,
} from "../../../shared/constants/permissions";
import TableShell from "../../../shared/components/TableShell";
import TableRowActions from "../../../shared/components/TableRowActions";

interface PermissionsTableProps {
  permissions: Permission[];
  isEditAllowed: boolean;
  onEdit: (item: Permission) => void;
}

const PermissionsTable = ({
  permissions,
  isEditAllowed,
  onEdit,
}: PermissionsTableProps) => (
  <TableShell
    emptyMessage="No permission data yet."
    headers={[
      "#",
      { content: "Name", isSortable: true },
      { content: "Page URL", isSortable: true },
      { content: "Description", isSortable: true },
      "Available Actions",
      { className: "text-end", content: "Actions" },
    ]}
    rows={permissions.map((item, index) => [
      index + 1,
      item.name,
      {
        sortValue: item.key,
        content: (
          <Link to={item.tab ? `${item.key}/${item.tab}` : item.key}>
            <code>{item.key}</code>
          </Link>
        ),
      },
      item.description,
      <div className="d-flex flex-wrap gap-2">
        {item.actions
          .filter((action) => isActionActive(item, action))
          .map((action) => (
            <span key={action} className={`badge ${PERMISSION_ACTION_BADGE_CLASS[action]}`}>
              {PERMISSION_ACTION_LABEL[action]}
            </span>
          ))}

        {item.activeActions.length === 0 && (
          <span className="text-muted">No active actions</span>
        )}
      </div>,
      {
        className: "text-end",
        content: (
          <TableRowActions
            item={item}
            actions={{ onEdit }}
            isEditAllowed={isEditAllowed}
            label={item.name}
          />
        ),
      },
    ])}
  />
);

export default PermissionsTable;
