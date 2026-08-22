import type { FormEvent } from "react";
import useForm from "../../../shared/hooks/useForm";
import { Role } from "../types/Role.types";
import {
  Permission,
  PermissionAction,
} from "../../../shared/types/Permission.types";
import FormInput from "../../../shared/components/form/FormInput";
import FormTextarea from "../../../shared/components/form/FormTextarea";
import {
  CRUD_ACTIONS,
  isActionActive,
  PERMISSION_ACTION_LABEL,
} from "../../../shared/constants/permissions";
import { toggleInArray } from "../../../shared/helpers/array.helper";
import {
  OffcanvasPanelHeader,
  OffcanvasPanelBody,
  OffcanvasFormActions,
  OffcanvasSectionLabel,
} from "../../../shared/components/OffcanvasPanel";

interface RoleFormProps {
  initialValues: Omit<Role, "id">;
  permissions: Permission[];
  isEditing: boolean;
  isLoading: boolean;
  onSubmit: (data: Omit<Role, "id">) => void;
  onCancel: () => void;
}

const RoleForm = ({
  initialValues,
  permissions,
  isEditing,
  isLoading,
  onSubmit,
  onCancel,
}: RoleFormProps) => {
  const { values, handleChange } = useForm(initialValues);

  const toggleAction = (permissionId: string, action: PermissionAction) => {
    handleChange("grants", {
      ...values.grants,
      [permissionId]: toggleInArray(values.grants[permissionId] ?? [], action),
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column h-100">
      <OffcanvasPanelHeader
        title={isEditing ? "Edit Role" : "Add Role"}
        onClose={onCancel}
      />

      <OffcanvasPanelBody>
        <OffcanvasSectionLabel>Role Details</OffcanvasSectionLabel>

        <FormInput
          id="role-name"
          label="Role Name"
          placeholder="Enter role name here"
          value={values.name}
          onChange={(value) => handleChange("name", value)}
          isRequired
        />

        <FormTextarea
          id="role-description"
          label="Description"
          placeholder="Describe this role"
          value={values.description}
          onChange={(value) => handleChange("description", value)}
        />

        <OffcanvasSectionLabel>Permissions</OffcanvasSectionLabel>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Module</th>
                {CRUD_ACTIONS.map((action) => (
                  <th className="text-center" key={action}>
                    {PERMISSION_ACTION_LABEL[action]}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.id}>
                  <td>{permission.name}</td>

                  {CRUD_ACTIONS.map((action) => {
                    if (!permission.actions.includes(action)) {
                      return (
                        <td className="text-center text-muted" key={action}>
                          &mdash;
                        </td>
                      );
                    }

                    const isGloballyDisabled = !isActionActive(
                      permission,
                      action,
                    );

                    return (
                      <td className="text-center" key={action}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          aria-label={`${permission.name} - ${PERMISSION_ACTION_LABEL[action]}`}
                          checked={(
                            values.grants[permission.id] ?? []
                          ).includes(action)}
                          disabled={isGloballyDisabled}
                          title={
                            isGloballyDisabled
                              ? "This action is globally disabled in Permission Management."
                              : undefined
                          }
                          onChange={() => toggleAction(permission.id, action)}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </OffcanvasPanelBody>

      <OffcanvasFormActions
        onCancel={onCancel}
        isLoading={isLoading}
        submitLabel={
          isLoading ? "Saving..." : isEditing ? "Save Changes" : "Add"
        }
      />
    </form>
  );
};

export default RoleForm;
