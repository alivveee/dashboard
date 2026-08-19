import useClientManager from "../../../shared/hooks/useClientManager";
import usePermission from "../../permissions/hooks/usePermission";
import { Role } from "../types/Role.types";
import {
  CRUD_ACTIONS,
  PERMISSION_ID,
  VIEW_ONLY_ACTIONS,
} from "../../../shared/constants/permissions";

export const ROLES_KEY = "gx-roles";

export const INITIAL_ROLES: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Akses penuh ke seluruh fitur sistem.",
    grants: {
      [PERMISSION_ID.USERS]: CRUD_ACTIONS,
      [PERMISSION_ID.ROLES]: CRUD_ACTIONS,
      [PERMISSION_ID.PERMISSIONS]: ["view", "edit"],
      [PERMISSION_ID.PACKAGE]: CRUD_ACTIONS,
      [PERMISSION_ID.PROSPECT]: CRUD_ACTIONS,
      [PERMISSION_ID.CUSTOMER]: CRUD_ACTIONS,
      [PERMISSION_ID.ANALYTICS]: VIEW_ONLY_ACTIONS,
    },
  },
  {
    id: "2",
    name: "Admin",
    description: "Mengelola data operasional harian.",
    grants: {
      [PERMISSION_ID.PACKAGE]: CRUD_ACTIONS,
      [PERMISSION_ID.PROSPECT]: CRUD_ACTIONS,
      [PERMISSION_ID.CUSTOMER]: CRUD_ACTIONS,
      [PERMISSION_ID.ANALYTICS]: VIEW_ONLY_ACTIONS,
    },
  },
  {
    id: "3",
    name: "User",
    description: "Akses terbatas untuk melihat data.",
    grants: {
      [PERMISSION_ID.ANALYTICS]: VIEW_ONLY_ACTIONS,
    },
  },
];

const emptyForm: Omit<Role, "id"> = {
  name: "",
  description: "",
  grants: {},
};

const useRole = () => {
  const manager = useClientManager<Role>({
    clientLabel: "Role",
    storageKey: ROLES_KEY,
    initialItems: INITIAL_ROLES,
    emptyFormData: emptyForm,
  });

  // Live permission list, so a permission toggled off/on in Permission
  // Management is reflected immediately when building role grants.
  const { permissions } = usePermission();

  return { ...manager, roles: manager.items, permissions };
};

export default useRole;
