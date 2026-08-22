import useAuth from "./useAuth";

interface PermissionFlags {
  isAddAllowed: boolean;
  isViewAllowed: boolean;
  isEditAllowed: boolean;
  isDeleteAllowed: boolean;
}

const usePermissionFlags = (permissionId: string): PermissionFlags => {
  const { can } = useAuth();

  return {
    isAddAllowed: can(permissionId, "add"),
    isViewAllowed: can(permissionId, "view"),
    isEditAllowed: can(permissionId, "edit"),
    isDeleteAllowed: can(permissionId, "delete"),
  };
};

export default usePermissionFlags;
