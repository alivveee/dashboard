import { Permission, PermissionAction } from "../types/Permission.types";

export const PERMISSION_ID = {
  USERS: "1",
  ROLES: "2",
  PERMISSIONS: "3",
  PACKAGE: "4",
  PROSPECT: "5",
  CUSTOMER: "6",
  ANALYTICS: "7",
} as const;

export const CRUD_ACTIONS: PermissionAction[] = ["view", "add", "edit", "delete"];
export const VIEW_ONLY_ACTIONS: PermissionAction[] = ["view"];

export const PERMISSION_ACTION_LABEL: Record<PermissionAction, string> = {
  view: "View",
  add: "Add",
  edit: "Edit",
  delete: "Delete",
};

export const PERMISSION_ACTION_BADGE_CLASS: Record<PermissionAction, string> = {
  view: "text-bg-info",
  add: "text-bg-success",
  edit: "text-bg-warning",
  delete: "text-bg-danger",
};

export const isActionActive = (
  permission: Pick<Permission, "activeActions">,
  action: PermissionAction,
) => permission.activeActions.includes(action);
