import useClientManager from "../../client/hooks/useClientManager";
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
    description: "Full access to all system features.",
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
    description: "Manages daily operational data.",
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
    description: "Limited access for viewing data only.",
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
  const { __permissions } = usePermission();

  return { ...manager, __roles: manager.__items, __permissions };
};

export default useRole;
