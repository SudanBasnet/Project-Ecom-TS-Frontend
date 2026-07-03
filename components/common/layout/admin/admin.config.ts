import type { IconType } from "react-icons";
import {
  FiGrid,
  FiLayers,
  FiPackage,
  FiShoppingBag,
  FiTag,
  FiUsers,
} from "react-icons/fi";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: IconType;
};

const adminNavItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: FiGrid },
  { label: "Categories", href: "/admin/categories", icon: FiLayers },
  { label: "Brands", href: "/admin/brands", icon: FiTag },
  { label: "Products", href: "/admin/products", icon: FiPackage },
  { label: "Users", href: "/admin/users", icon: FiUsers },
  { label: "Orders", href: "/admin/orders", icon: FiShoppingBag },
];

const userNavItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: FiGrid },
];

export const getAdminNavItems = (role: "admin" | "user") =>
  role === "admin" ? adminNavItems : userNavItems;

export const isAdminRouteActive = (pathname: string, href: string) =>
  href === "/admin" ? pathname === href : pathname.startsWith(href);

export const getAdminPageTitle = (
  pathname: string,
  role: "admin" | "user",
) =>
  getAdminNavItems(role).find(({ href }) => isAdminRouteActive(pathname, href))
    ?.label ?? (role === "admin" ? "Admin" : "Dashboard");
