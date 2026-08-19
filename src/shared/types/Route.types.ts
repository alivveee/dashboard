import { ComponentType, ReactNode } from "react";

export interface RouteConfig {
  path: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  component: ReactNode;
  children?: RouteConfig[];
}
