import type { FormEvent } from "react";
import useForm from "../../../shared/hooks/useForm";
import { Permission, PermissionAction } from "../../../shared/types/Permission.types";
import PermissionActionsFieldset from "../../../shared/components/form/PermissionActionsFieldset";
import { toggleInArray } from "../../../shared/helpers/array.helper";
import {
  OffcanvasPanelHeader,
  OffcanvasPanelBody,
  OffcanvasFormActions,
} from "../../../shared/components/OffcanvasPanel";

interface PermissionFormProps {
  permission: Permission;
  isLoading: boolean;
  onSubmit: (activeActions: PermissionAction[]) => void;
  onCancel: () => void;
}

const PermissionForm = ({
  permission,
  isLoading,
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
      <OffcanvasPanelHeader title="Edit Permission" onClose={onCancel} />

      <OffcanvasPanelBody>
        <PermissionActionsFieldset
          idPrefix="permission-action"
          title={permission.name}
          description={permission.description}
          actions={permission.actions}
          selectedActions={values.activeActions}
          onToggle={toggleAction}
          getActionState={(action) => {
            // Guard against a Super Admin locking themselves out of this
            // very screen by disabling the action that controls it.
            const isSelfLockRisk =
              permission.tab === "permissions" && action === "edit";

            return {
              disabled: isSelfLockRisk,
              disabledReason: isSelfLockRisk
                ? "This action cannot be disabled so access to Permission Management is not lost."
                : undefined,
            };
          }}
        />
      </OffcanvasPanelBody>

      <OffcanvasFormActions
        onCancel={onCancel}
        isLoading={isLoading}
        submitLabel={isLoading ? "Saving..." : "Save Changes"}
      />
    </form>
  );
};

export default PermissionForm;
