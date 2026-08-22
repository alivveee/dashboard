import { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../shared/layout/MainLayout";
import ProtectedRoute from "../shared/layout/ProtectedRoute";
import RequirePermission from "../shared/layout/RequirePermission";
import LoginPage from "../modules/auth/pages/LoginPage";
import NotFoundPage from "../shared/pages/NotFoundPage";
import PageLoader from "../shared/components/PageLoader";
import { routes } from "./routes.config";
import { RouteConfig } from "../shared/types/Route.types";

const renderRoutes = (items: RouteConfig[], basePath = "") =>
  items.map((route) => {
    const toRelativePath = (fullPath: string) =>
      basePath
        ? fullPath.slice(basePath.length + 1)
        : fullPath.replace(/^\//, "");

    const relativePath = toRelativePath(route.path);
    const Component = route.component;

    const element = (
      <RequirePermission permission={route.path}>
        <Suspense fallback={<PageLoader />}>
          <Component />
        </Suspense>
      </RequirePermission>
    );

    if (route.children?.length) {
      return (
        <Route key={route.path} path={relativePath} element={element}>
          {renderRoutes(route.children, route.path)}
        </Route>
      );
    }

    if (route.path === "/") {
      return <Route key={route.path} index element={element} />;
    }

    return (
      <Fragment key={route.path}>
        <Route path={relativePath} element={element} />
        {route.aliasPaths?.map((aliasPath) => (
          <Route
            key={aliasPath}
            path={toRelativePath(aliasPath)}
            element={element}
          />
        ))}
      </Fragment>
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
