import { Link } from "react-router-dom";
import { Permission, PermissionAction } from "../../../shared/types/Permission.types";
import {
  isActionActive,
  PERMISSION_ACTION_BADGE_CLASS,
  PERMISSION_ACTION_LABEL,
} from "../../../shared/constants/permissions";
import TableShell from "../../../shared/components/TableShell";

interface PermissionsTableProps {
  permissions: Permission[];
  canManage: boolean;
  onToggleAction: (permission: Permission, action: PermissionAction) => void;
}

const PermissionsTable = ({
  permissions,
  canManage,
  onToggleAction,
}: PermissionsTableProps) => (
  <TableShell
    emptyMessage="No permission data yet."
    headers={["#", "Name", "Page URL", "Description", "Available Actions"]}
    rows={permissions.map((item, index) => [
      index + 1,
      item.name,
      <Link to={item.tab ? `${item.key}?tab=${item.tab}` : item.key}>
        <code>{item.key}</code>
      </Link>,
      item.description,
      canManage ? (
        <div className="d-flex flex-wrap gap-3">
          {item.actions.map((action) => {
            // Guard against a Super Admin locking themselves out of this
            // very screen by disabling the action that controls it.
            const isSelfLockRisk = item.tab === "permissions" && action === "edit";

            return (
              <div className="form-check" key={action}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`permission-action-${item.id}-${action}`}
                  checked={isActionActive(item, action)}
                  disabled={isSelfLockRisk}
                  title={
                    isSelfLockRisk
                      ? "This action cannot be disabled so access to Permission Management is not lost."
                      : undefined
                  }
                  onChange={() => onToggleAction(item, action)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`permission-action-${item.id}-${action}`}
                >
                  {PERMISSION_ACTION_LABEL[action]}
                </label>
              </div>
            );
          })}
        </div>
      ) : (
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
        </div>
      ),
    ])}
  />
);

export default PermissionsTable;
