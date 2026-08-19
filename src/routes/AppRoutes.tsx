import { Route, Routes } from "react-router-dom";
import MainLayout from "../shared/layout/MainLayout";
import ProtectedRoute from "../shared/layout/ProtectedRoute";
import RequirePermission from "../shared/layout/RequirePermission";
import LoginPage from "../modules/auth/pages/LoginPage";
import NotFoundPage from "../shared/pages/NotFoundPage";
import { routes } from "./routes.config";
import { RouteConfig } from "../shared/types/Route.types";

const renderRoutes = (items: RouteConfig[], basePath = "") =>
  items.map((route) => {
    const relativePath = basePath
      ? route.path.slice(basePath.length + 1)
      : route.path.replace(/^\//, "");

    const element = (
      <RequirePermission permission={route.path}>
        {route.component}
      </RequirePermission>
    );

    if (route.children?.length) {
      return (
        <Route key={route.path} path={relativePath} element={element}>
          {renderRoutes(route.children, route.path)}
        </Route>
      );
    }

    return route.path === "/" ? (
      <Route key={route.path} index element={element} />
    ) : (
      <Route key={route.path} path={relativePath} element={element} />
    );
  });

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {renderRoutes(routes)}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
