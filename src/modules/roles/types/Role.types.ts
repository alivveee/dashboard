import { PermissionAction } from "../../../shared/types/Permission.types";

// key = Permission.id, value = actions granted on that module.
// A missing key (or empty array) means no access to that module.
export type RoleGrants = Record<string, PermissionAction[]>;

export interface Role {
  id: string;
  name: string;
  description: string;
  grants: RoleGrants;
}

export interface RoleFormData {
  name: string;
  description: string;
  grants: RoleGrants;
}
