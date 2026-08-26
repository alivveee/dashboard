import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const { __isAuthenticated, __login } = useAuth();
  const location = useLocation();

  if (__isAuthenticated) {
    const redirectTo = (location.state as { from?: string })?.from ?? "/";

    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-body-tertiary p-3">
      <div
        className="card shadow-sm"
        style={{
          width: "100%",
          maxWidth: 380,
        }}
      >
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h1 className="h3 fw-semibold mb-1">GX App</h1>

            <p className="text-muted mb-0">
              Sign in to your account to continue
            </p>
          </div>

          <LoginForm onSubmit={__login} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
