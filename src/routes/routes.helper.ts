import { ComponentType, ReactNode } from "react";
import { RouteConfig } from "../shared/types/Route.types";

export const createRoute = (
  path: string,
  label: string,
  icon: ComponentType,
  component: ReactNode,
  children?: RouteConfig[],
): RouteConfig => ({
  path,
  label,
  icon,
  component,
  children,
});

export const isRouteActive = (
  route: RouteConfig,
  pathname: string,
): boolean => {
  if (route.children?.length) {
    return route.children.some((child) => isRouteActive(child, pathname));
  }

  if (route.path === "/") {
    return pathname === "/";
  }

  return pathname === route.path || pathname.startsWith(`${route.path}/`);
};

export const findActiveRoute = (
  items: RouteConfig[],
  pathname: string,
): RouteConfig | undefined => {
  for (const route of items) {
    if (route.children?.length) {
      const activeRoute = findActiveRoute(route.children, pathname);

      if (activeRoute) {
        return activeRoute;
      }

      continue;
    }

    if (isRouteActive(route, pathname)) {
      return route;
    }
  }

  return undefined;
};

export interface PageUrlOption {
  path: string;
  label: string;
}

export const filterRoutesByPermission = (
  items: RouteConfig[],
  hasPermission: (key: string) => boolean,
): RouteConfig[] =>
  items.reduce<RouteConfig[]>((visible, route) => {
    if (!hasPermission(route.path)) {
      return visible;
    }

    if (route.children?.length) {
      const children = filterRoutesByPermission(route.children, hasPermission);

      if (!children.length) {
        return visible;
      }

      visible.push({
        ...route,
        children,
      });

      return visible;
    }

    visible.push(route);

    return visible;
  }, []);
