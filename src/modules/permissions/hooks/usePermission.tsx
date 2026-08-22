import { useRef, useState } from "react";
import useCrud from "../../../shared/hooks/useCrud";
import { createOffcanvasControls } from "../../../shared/helpers/offcanvas";
import type { OffcanvasHandle } from "../../../shared/components/Offcanvas";
import { Permission, PermissionAction } from "../../../shared/types/Permission.types";
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

const usePermission = () => {
  const {
    items: permissions,
    loading,
    update,
  } = useCrud<Permission>(PERMISSIONS_KEY, INITIAL_PERMISSIONS);

  const formOffcanvas = createOffcanvasControls(useRef<OffcanvasHandle>(null));
  const [selectedItem, setSelectedItem] = useState<Permission | null>(null);

  const openEdit = (item: Permission) => {
    setSelectedItem(item);
    formOffcanvas.open();
  };

  const closeForm = () => {
    formOffcanvas.close();
    setSelectedItem(null);
  };

  const submitForm = async (activeActions: PermissionAction[]) => {
    if (!selectedItem) return;

    const { id, ...rest } = selectedItem;

    await update(id, { ...rest, activeActions });
    closeForm();
  };

  return {
    permissions,
    loading,

    selectedItem,
    formOffcanvasRef: formOffcanvas.ref,
    openEdit,
    submitForm,
    closeForm,
  };
};

export default usePermission;
