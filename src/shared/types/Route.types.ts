import { ComponentType } from "react";

export interface RouteConfig {
  path: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  component: ComponentType;
  children?: RouteConfig[];
}
