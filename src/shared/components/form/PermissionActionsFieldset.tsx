import { PermissionAction } from "../../types/Permission.types";
import { PERMISSION_ACTION_LABEL } from "../../constants/permissions";

interface PermissionActionState {
  disabled: boolean;
  disabledReason?: string;
}

interface PermissionActionsFieldsetProps {
  idPrefix: string;
  title: string;
  description?: string;
  actions: PermissionAction[];
  selectedActions: PermissionAction[];
  onToggle: (action: PermissionAction) => void;
  getActionState?: (action: PermissionAction) => PermissionActionState;
}

const PermissionActionsFieldset = ({
  idPrefix,
  title,
  description,
  actions,
  selectedActions,
  onToggle,
  getActionState,
}: PermissionActionsFieldsetProps) => (
  <div className="card">
    <div className="card-body">
      <div className="fw-semibold">{title}</div>

      {description ? (
        <div className="text-muted small mb-2">{description}</div>
      ) : null}

      <div className="row row-cols-2 g-2 mt-1">
        {actions.map((action) => {
          const { disabled, disabledReason } = getActionState?.(action) ?? {
            disabled: false,
          };

          return (
            <div className="col" key={`${idPrefix}-${action}`}>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`${idPrefix}-${action}`}
                  checked={selectedActions.includes(action)}
                  disabled={disabled}
                  title={disabled ? disabledReason : undefined}
                  onChange={() => onToggle(action)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`${idPrefix}-${action}`}
                >
                  {PERMISSION_ACTION_LABEL[action]}

                  {disabled ? (
                    <span className="text-muted"> (disabled)</span>
                  ) : null}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default PermissionActionsFieldset;
