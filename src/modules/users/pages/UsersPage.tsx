import Tabs, { TabItem } from "../../../shared/components/Tabs";
import UserListTab from "../components/UserListTab";
import RoleManagementTab from "../../roles/components/RoleManagementTab";
import PermissionManagementTab from "../../permissions/components/PermissionManagementTab";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";
import { path } from "../../../routes/routes.paths";
import { USERS_PAGE_TAB_KEYS } from "./UsersPage.constants";

const UsersPage = () => {
  const { isViewAllowed: isUsersViewAllowed } = usePermissionFlags(PERMISSION_ID.USERS);
  const { isViewAllowed: isRolesViewAllowed } = usePermissionFlags(PERMISSION_ID.ROLES);
  const { isViewAllowed: isPermissionsViewAllowed } = usePermissionFlags(
    PERMISSION_ID.PERMISSIONS,
  );

  const items: TabItem[] = [];

  if (isUsersViewAllowed) {
    items.push({
      key: USERS_PAGE_TAB_KEYS.users,
      label: "User Management",
      content: <UserListTab />,
    });
  }

  if (isRolesViewAllowed) {
    items.push({
      key: USERS_PAGE_TAB_KEYS.roles,
      label: "Role Management",
      content: <RoleManagementTab />,
    });
  }

  if (isPermissionsViewAllowed) {
    items.push({
      key: USERS_PAGE_TAB_KEYS.permissions,
      label: "Permission Management",
      content: <PermissionManagementTab />,
    });
  }

  return (
    <>
      <Tabs items={items} basePath={path.settings.users} />
    </>
  );
};

export default UsersPage;
