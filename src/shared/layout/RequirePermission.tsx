import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../modules/auth/hooks/useAuth";
import { path } from "../../routes/routes.paths";

interface RequirePermissionProps {
  permission?: string;
  children: ReactNode;
}

const RequirePermission = ({
  permission,
  children,
}: RequirePermissionProps) => {
  const { hasPermission } = useAuth();

  if (permission && !hasPermission(permission)) {
    return <Navigate to={path.dashboard} replace />;
  }

  return children;
};

export default RequirePermission;
