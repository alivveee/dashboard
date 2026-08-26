import useAuth from "./useAuth";

interface PermissionFlags {
  __isAddAllowed: boolean;
  __isViewAllowed: boolean;
  __isEditAllowed: boolean;
  __isDeleteAllowed: boolean;
}

const usePermissionFlags = (permissionId: string): PermissionFlags => {
  const { __can } = useAuth();

  return {
    __isAddAllowed: __can(permissionId, "add"),
    __isViewAllowed: __can(permissionId, "view"),
    __isEditAllowed: __can(permissionId, "edit"),
    __isDeleteAllowed: __can(permissionId, "delete"),
  };
};

export default usePermissionFlags;
