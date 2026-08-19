import type { FormEvent } from "react";
import useForm from "../../../shared/hooks/useForm";
import { Role } from "../types/Role.types";
import { Permission, PermissionAction } from "../../../shared/types/Permission.types";
import FormInput from "../../../shared/components/form/FormInput";
import FormTextarea from "../../../shared/components/form/FormTextarea";
import {
  isActionActive,
  PERMISSION_ACTION_LABEL,
} from "../../../shared/constants/permissions";
import { toggleInArray } from "../../../shared/helpers/array.helper";

interface RoleFormProps {
  initialValues: Omit<Role, "id">;
  permissions: Permission[];
  isEditing: boolean;
  loading: boolean;
  onSubmit: (data: Omit<Role, "id">) => void;
  onCancel: () => void;
}

const RoleForm = ({
  initialValues,
  permissions,
  isEditing,
  loading,
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
    <form onSubmit={handleSubmit}>
      <div className="modal-header">
        <h5 className="modal-title">{isEditing ? "Edit Role" : "Tambah Role"}</h5>

        <button
          type="button"
          className="btn-close"
          aria-label="Tutup"
          onClick={onCancel}
        />
      </div>

      <div className="modal-body">
        <FormInput
          id="role-name"
          label="Nama Role"
          placeholder="Tulis nama role disini"
          value={values.name}
          onChange={(value) => handleChange("name", value)}
          required
        />

        <FormTextarea
          id="role-description"
          label="Deskripsi"
          placeholder="Jelaskan role ini"
          value={values.description}
          onChange={(value) => handleChange("description", value)}
        />

        <div className="mb-3">
          <label className="form-label">Permission</label>

          <div className="d-flex flex-column gap-3">
            {permissions.map((permission) => (
              <div key={permission.id}>
                <div className="fw-semibold mb-1">{permission.name}</div>

                <div className="d-flex flex-wrap gap-3">
                  {permission.actions.map((action) => {
                    const isGloballyDisabled = !isActionActive(permission, action);

                    return (
                      <div className="form-check" key={`${permission.id}-${action}`}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`role-permission-${permission.id}-${action}`}
                          checked={(values.grants[permission.id] ?? []).includes(
                            action,
                          )}
                          disabled={isGloballyDisabled}
                          title={
                            isGloballyDisabled
                              ? "Aksi ini dinonaktifkan secara global di Permission Management."
                              : undefined
                          }
                          onChange={() => toggleAction(permission.id, action)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`role-permission-${permission.id}-${action}`}
                        >
                          {PERMISSION_ACTION_LABEL[action]}

                          {isGloballyDisabled && (
                            <span className="text-muted"> (nonaktif)</span>
                          )}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Batal
        </button>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Tambah"}
        </button>
      </div>
    </form>
  );
};

export default RoleForm;
