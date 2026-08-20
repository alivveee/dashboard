import useCrud from "../../../shared/hooks/useCrud";
import { Permission } from "../../../shared/types/Permission.types";
import { path } from "../../../routes/routes.paths";
import {
  CRUD_ACTIONS,
  PERMISSION_ID,
  VIEW_ONLY_ACTIONS,
} from "../../../shared/constants/permissions";

export const PERMISSIONS_KEY = "gx-permissions";

export const INITIAL_PERMISSIONS: Permission[] = [
  {
    id: PERMISSION_ID.USERS,
    name: "Manage Users",
    key: path.settings.users,
    description: "Add, edit, and delete user data.",
    actions: CRUD_ACTIONS,
    activeActions: CRUD_ACTIONS,
    tab: "users",
  },
  {
    id: PERMISSION_ID.ROLES,
    name: "Manage Roles",
    key: path.settings.users,
    description: "Add, edit, and delete roles.",
    actions: CRUD_ACTIONS,
    activeActions: CRUD_ACTIONS,
    tab: "roles",
  },
  {
    id: PERMISSION_ID.PERMISSIONS,
    name: "Manage Permissions",
    key: path.settings.users,
    description:
      "View the permission list and enable/disable permission actions globally for all users.",
    actions: ["view", "edit"],
    activeActions: ["view", "edit"],
    tab: "permissions",
  },
  {
    id: PERMISSION_ID.PACKAGE,
    name: "Manage Package",
    key: path.settings.package,
    description: "Add, edit, and delete packages.",
    actions: CRUD_ACTIONS,
    activeActions: CRUD_ACTIONS,
  },
  {
    id: PERMISSION_ID.PROSPECT,
    name: "Manage Prospect",
    key: path.prospect,
    description: "Manage prospect data.",
    actions: CRUD_ACTIONS,
    activeActions: CRUD_ACTIONS,
  },
  {
    id: PERMISSION_ID.CUSTOMER,
    name: "Manage Customer",
    key: path.customer,
    description: "Manage customer data.",
    actions: CRUD_ACTIONS,
    activeActions: CRUD_ACTIONS,
  },
  {
    id: PERMISSION_ID.ANALYTICS,
    name: "View Analytics",
    key: path.analytics,
    description: "Access the analytics page.",
    actions: VIEW_ONLY_ACTIONS,
    activeActions: VIEW_ONLY_ACTIONS,
  },
];

export const normalizePermissions = (items: Permission[]): Permission[] =>
  items.map((item) =>
    item.activeActions ? item : { ...item, activeActions: item.actions },
  );

const usePermission = () => {
  const {
    items: permissions,
    loading,
    update,
  } = useCrud<Permission>(PERMISSIONS_KEY, INITIAL_PERMISSIONS);

  const savePermissions = (draft: Permission[]) => {
    const changed = draft.filter((item) => {
      const original = permissions.find((p) => p.id === item.id);

      return (
        original &&
        (original.activeActions.length !== item.activeActions.length ||
          !original.activeActions.every((action) =>
            item.activeActions.includes(action),
          ))
      );
    });

    return Promise.all(
      changed.map((item) => {
        const { id, ...rest } = item;

        return update(id, rest);
      }),
    );
  };

  return { permissions, loading, savePermissions };
};

export default usePermission;
