import Tabs, { TabItem } from "../../../shared/components/Tabs";
import UserListTab from "../components/UserListTab";
import RoleManagementTab from "../../roles/components/RoleManagementTab";
import PermissionManagementTab from "../../permissions/components/PermissionManagementTab";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const UsersPage = () => {
  const { canView: canViewUsers } = usePermissionFlags(PERMISSION_ID.USERS);
  const { canView: canViewRoles } = usePermissionFlags(PERMISSION_ID.ROLES);
  const { canView: canViewPermissions } = usePermissionFlags(
    PERMISSION_ID.PERMISSIONS,
  );

  const items: TabItem[] = [];

  if (canViewUsers) {
    items.push({
      key: "users",
      label: "User Management",
      content: <UserListTab />,
    });
  }

  if (canViewRoles) {
    items.push({
      key: "roles",
      label: "Role Management",
      content: <RoleManagementTab />,
    });
  }

  if (canViewPermissions) {
    items.push({
      key: "permissions",
      label: "Permission Management",
      content: <PermissionManagementTab />,
    });
  }

  return (
    <div>
      <Tabs items={items} />
    </div>
  );
};

export default UsersPage;
