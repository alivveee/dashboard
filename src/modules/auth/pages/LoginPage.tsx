import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
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
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </div>

          <LoginForm onSubmit={login} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
