import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../modules/auth/hooks/useAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { __isAuthenticated } = useAuth();
  const location = useLocation();

  if (!__isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
