import { useState } from "react";
import PageHeader from "../../../shared/components/PageHeader";
import PermissionsTable from "./PermissionsTable";
import usePermission from "../hooks/usePermission";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";
import { IconEdit } from "../../../shared/components/icons/Icons";
import { Permission, PermissionAction } from "../../../shared/types/Permission.types";
import { toggleInArray } from "../../../shared/helpers/array.helper";

const PermissionManagementTab = () => {
  const { permissions, loading, savePermissions } = usePermission();
  const { canEdit: canManage } = usePermissionFlags(PERMISSION_ID.PERMISSIONS);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Permission[]>(permissions);

  const handleEdit = () => {
    setDraft(permissions);
    setIsEditing(true);
  };

  const handleToggleAction = (permission: Permission, action: PermissionAction) => {
    setDraft((prev) =>
      prev.map((item) =>
        item.id !== permission.id
          ? item
          : { ...item, activeActions: toggleInArray(item.activeActions, action) },
      ),
    );
  };

  const handleSave = async () => {
    await savePermissions(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <PageHeader
        title="Daftar permission"
        action={
          !isEditing && canManage
            ? { label: "Edit", icon: <IconEdit />, onClick: handleEdit }
            : undefined
        }
        actions={
          isEditing ? (
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Batal
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          ) : undefined
        }
      />

      <PermissionsTable
        permissions={isEditing ? draft : permissions}
        canManage={isEditing}
        onToggleAction={handleToggleAction}
      />
    </div>
  );
};

export default PermissionManagementTab;
