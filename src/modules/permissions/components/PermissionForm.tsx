import type { FormEvent } from "react";
import useForm from "../../../shared/hooks/useForm";
import { Permission, PermissionAction } from "../../../shared/types/Permission.types";
import { PERMISSION_ACTION_LABEL } from "../../../shared/constants/permissions";
import { toggleInArray } from "../../../shared/helpers/array.helper";

interface PermissionFormProps {
  permission: Permission;
  loading: boolean;
  onSubmit: (activeActions: PermissionAction[]) => void;
  onCancel: () => void;
}

const PermissionForm = ({
  permission,
  loading,
  onSubmit,
  onCancel,
}: PermissionFormProps) => {
  const { values, handleChange } = useForm({
    activeActions: permission.activeActions,
  });

  const toggleAction = (action: PermissionAction) => {
    handleChange("activeActions", toggleInArray(values.activeActions, action));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(values.activeActions);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column h-100">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Edit Permission</h5>

        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onCancel}
        />
      </div>

      <div className="offcanvas-body">
        <div className="mb-3">
          <div className="fw-semibold">{permission.name}</div>
          <div className="text-muted small">{permission.description}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Available Actions</label>

          <div className="d-flex flex-wrap gap-3">
            {permission.actions.map((action) => {
              // Guard against a Super Admin locking themselves out of this
              // very screen by disabling the action that controls it.
              const isSelfLockRisk =
                permission.tab === "permissions" && action === "edit";

              return (
                <div className="form-check" key={action}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`permission-action-${action}`}
                    checked={values.activeActions.includes(action)}
                    disabled={isSelfLockRisk}
                    title={
                      isSelfLockRisk
                        ? "This action cannot be disabled so access to Permission Management is not lost."
                        : undefined
                    }
                    onChange={() => toggleAction(action)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`permission-action-${action}`}
                  >
                    {PERMISSION_ACTION_LABEL[action]}

                    {isSelfLockRisk && (
                      <span className="text-muted"> (disabled)</span>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 border-top p-3 mt-3">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default PermissionForm;
