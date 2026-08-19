import { Outlet } from "react-router-dom";
import {
  IconAnalytics,
  IconCustomer,
  IconDashboard,
  IconProducts,
  IconProspect,
  IconSettings,
  IconUser,
  IconUsers,
} from "../shared/components/icons/Icons";
import { createRoute } from "./routes.helper";

import DashboardPage from "../modules/dashboard/pages/DashboardPage";
import CustomerPage from "../modules/customer/pages/CustomerPage";
import AnalyticsPage from "../modules/analytics/pages/AnalyticsPage";
import UsersPage from "../modules/users/pages/UsersPage";
import ProfilePage from "../modules/profile/pages/ProfilePage";
import PackagePage from "../modules/package/pages/PackagePage";
import ProspectPage from "../modules/prospect/pages/ProspectPage";

export const path = {
  dashboard: "/",
  prospect: "/prospect",
  customer: "/customer",
  analytics: "/analytics",
  settings: {
    root: "/settings",
    users: "/settings/users",
    profile: "/settings/profile",
    package: "/settings/package",
  },
} as const;

export const routes = [
  createRoute(path.dashboard, "Dashboard", IconDashboard, <DashboardPage />),

  createRoute(path.prospect, "Prospect", IconProspect, <ProspectPage />),

  createRoute(path.customer, "Customer", IconCustomer, <CustomerPage />),

  createRoute(path.analytics, "Analytics", IconAnalytics, <AnalyticsPage />),

  createRoute(path.settings.root, "Settings", IconSettings, <Outlet />, [
    createRoute(path.settings.users, "Users", IconUsers, <UsersPage />),

    createRoute(path.settings.profile, "Profile", IconUser, <ProfilePage />),

    createRoute(
      path.settings.package,
      "Package",
      IconProducts,
      <PackagePage />,
    ),
  ]),
];
