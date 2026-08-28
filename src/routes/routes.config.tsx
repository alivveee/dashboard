import { lazy } from "react";
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
import { path } from "./routes.paths";
import { USERS_PAGE_TAB_KEYS } from "../modules/users/pages/UsersPage.constants";

const DashboardPage = lazy(() => import("../modules/dashboard/pages/DashboardPage"));
const CustomerPage = lazy(() => import("../modules/customer/pages/CustomerPage"));
const AnalyticsPage = lazy(() => import("../modules/analytics/pages/AnalyticsPage"));
const UsersPage = lazy(() => import("../modules/users/pages/UsersPage"));
const ProfilePage = lazy(() => import("../modules/profile/pages/ProfilePage"));
const PackagePage = lazy(() => import("../modules/package/pages/PackagePage"));
const ProspectPage = lazy(() => import("../modules/prospect/pages/ProspectPage"));
const ProductMarketingPage = lazy(
  () => import("../modules/product/pages/ProductMarketingPage"),
);

export const routes = [
  createRoute(path.dashboard, "Dashboard", IconDashboard, DashboardPage),

  createRoute(path.prospect, "Prospect", IconProspect, ProspectPage),

  createRoute(path.customer, "Customer", IconCustomer, CustomerPage),

  createRoute(path.analytics, "Analytics", IconAnalytics, AnalyticsPage),

  createRoute(
    path.productMarketing,
    "Product Marketing",
    IconProducts,
    ProductMarketingPage,
  ),

  createRoute(path.settings.root, "Settings", IconSettings, Outlet, [
    {
      ...createRoute(path.settings.users, "Users", IconUsers, UsersPage),
      aliasPaths: Object.values(USERS_PAGE_TAB_KEYS).map(
        (tab) => `${path.settings.users}/${tab}`,
      ),
    },

    createRoute(path.settings.profile, "Profile", IconUser, ProfilePage),

    createRoute(path.settings.package, "Package", IconProducts, PackagePage),
  ]),
];
