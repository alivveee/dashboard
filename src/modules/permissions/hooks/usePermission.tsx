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
    name: "Kelola User",
    key: path.settings.users,
    description: "Menambah, mengubah, dan menghapus data user.",
    actions: CRUD_ACTIONS,
    activeActions: CRUD_ACTIONS,
    tab: "users",
  },
  {
    id: PERMISSION_ID.ROLES,
    name: "Kelola Role",
    key: path.settings.users,
    description: "Menambah, mengubah, dan menghapus role.",
    actions: CRUD_ACTIONS,
    activeActions: CRUD_ACTIONS,
    tab: "roles",
  },
  {
    id: PERMISSION_ID.PERMISSIONS,
    name: "Kelola Permission",
    key: path.settings.users,
    description:
      "Melihat daftar permission dan mengaktifkan/menonaktifkan aksi permission secara global untuk seluruh user.",
    actions: ["view", "edit"],
    activeActions: ["view", "edit"],
    tab: "permissions",
  },
  {
    id: PERMISSION_ID.PACKAGE,
    name: "Kelola Paket",
    key: path.settings.package,
    description: "Menambah, mengubah, dan menghapus paket.",
    actions: CRUD_ACTIONS,
    activeActions: CRUD_ACTIONS,
  },
  {
    id: PERMISSION_ID.PROSPECT,
    name: "Kelola Prospect",
    key: path.prospect,
    description: "Mengelola data prospect.",
    actions: CRUD_ACTIONS,
    activeActions: CRUD_ACTIONS,
  },
  {
    id: PERMISSION_ID.CUSTOMER,
    name: "Kelola Customer",
    key: path.customer,
    description: "Mengelola data customer.",
    actions: CRUD_ACTIONS,
    activeActions: CRUD_ACTIONS,
  },
  {
    id: PERMISSION_ID.ANALYTICS,
    name: "Lihat Analytics",
    key: path.analytics,
    description: "Mengakses halaman analytics.",
    actions: VIEW_ONLY_ACTIONS,
    activeActions: VIEW_ONLY_ACTIONS,
  },
];

export const normalizePermissions = (items: Permission[]): Permission[] =>
  items.map((item) =>
    item.activeActions ? item : { ...item, activeActions: item.actions },
  );

const usePermission = () => {
  const { items, loading, update } = useCrud<Permission>(
    PERMISSIONS_KEY,
    INITIAL_PERMISSIONS,
  );

  const permissions = normalizePermissions(items);

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
