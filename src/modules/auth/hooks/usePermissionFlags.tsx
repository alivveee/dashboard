import useAuth from "./useAuth";

interface PermissionFlags {
  canAdd: boolean;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

const usePermissionFlags = (permissionId: string): PermissionFlags => {
  const { can } = useAuth();

  return {
    canAdd: can(permissionId, "add"),
    canView: can(permissionId, "view"),
    canEdit: can(permissionId, "edit"),
    canDelete: can(permissionId, "delete"),
  };
};

export default usePermissionFlags;
