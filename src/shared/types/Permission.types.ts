export type PermissionAction = "view" | "add" | "edit" | "delete";

export interface Permission {
  id: string;
  name: string;
  key: string;
  description: string;
  actions: PermissionAction[]; // full set of actions this module supports (fixed checkbox list)
  activeActions: PermissionAction[]; // subset of `actions` currently enabled globally — unchecking one here blocks it for every role/user
  tab?: string; // query param value (?tab=) for pages whose key hosts multiple tabs
}
