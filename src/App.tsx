import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./modules/auth/hooks/useAuth";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
