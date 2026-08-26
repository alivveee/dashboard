import { createContext, useContext, type ReactNode } from "react";
import useLocalStorage from "../../../shared/hooks/useLocalStorage";
import { INITIAL_USERS, USERS_KEY } from "../../users/hooks/useUser";
import { INITIAL_ROLES, ROLES_KEY } from "../../roles/hooks/useRole";
import {
  INITIAL_PERMISSIONS,
  PERMISSIONS_KEY,
} from "../../permissions/hooks/usePermission";
import { isActionActive } from "../../../shared/constants/permissions";
import { User } from "../../users/types/User.types";
import { Role } from "../../roles/types/Role.types";
import {
  Permission,
  PermissionAction,
} from "../../../shared/types/Permission.types";

export interface Session {
  email: string;
  name: string;
  role: string;
}

export const AUTH_KEY = "gx-auth";

interface AuthContextValue {
  session: Session | null;
  isAuthenticated: boolean;
  role: Role | undefined;
  can: (permissionId: string, action: PermissionAction) => boolean;
  hasPermission: (key: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateSession: (session: Session) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useLocalStorage<Session | null>(AUTH_KEY, null);
  const [users] = useLocalStorage<User[]>(USERS_KEY, INITIAL_USERS);
  const [roles] = useLocalStorage<Role[]>(ROLES_KEY, INITIAL_ROLES);
  const [permissions] = useLocalStorage<Permission[]>(
    PERMISSIONS_KEY,
    INITIAL_PERMISSIONS,
  );

  const permissionsById = new Map(permissions.map((p) => [p.id, p]));

  const role = session ? roles.find((r) => r.id === session.role) : undefined;

  const can = (permissionId: string, action: PermissionAction) => {
    if (!role) return false;
    const permission = permissionsById.get(permissionId);
    if (!permission || !isActionActive(permission, action)) return false;
    return role.grants[permissionId]?.includes(action) ?? false;
  };
  const hasPermission = (key: string) => {
    if (!role) return false;
    const relevantPermissions = permissions.filter((p) => p.key === key);

    if (relevantPermissions.length === 0) return true;
    return relevantPermissions.some((p) => {
      const granted = role.grants[p.id] ?? [];
      return granted.some((action) => isActionActive(p, action));
    });
  };

  const login = (email: string, password: string) => {
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) return false;
    setSession({
      email: user.email,
      name: user.name,
      role: user.role,
    });
    return true;
  };

  const logout = () => {
    setSession(null);
  };

  const value = () => ({
    session,
    isAuthenticated: !!session,
    role,
    can,
    hasPermission,
    login,
    logout,
    updateSession: setSession,
  });

  return (
    <AuthContext.Provider value={value()}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return ctx;
};

export default useAuth;
