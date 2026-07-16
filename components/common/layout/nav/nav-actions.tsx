import Link from "next/link";
import { useState } from "react";
import { FaBars, FaHeart, FaShoppingCart } from "react-icons/fa";
import {
  FiChevronDown,
  FiGrid,
  FiLoader,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import type { AuthSession } from "@/lib/auth-session";
import { useAuth } from "@/hooks/auth.hook";
import { isActiveRoute } from "./nav.config";
import NavLinks from "./nav-links";
import Dropdown from "../../ui/dropdown";
import { useRouter } from "next/navigation";
import ThemeToggle from "../../ui/theme-toggle";

type NavActionsProps = {
  pathname: string;
};

type IconLinkProps = {
  href: string;
  label: string;
  active: boolean;
  activeClassName: string;
  inactiveClassName: string;
  children: React.ReactNode;
};

const IconLink = ({
  href,
  label,
  active,
  activeClassName,
  inactiveClassName,
  children,
}: IconLinkProps) => {
  return (
    <Link
      href={href}
      className={`grid size-10 place-items-center rounded-xl transition ${
        active ? activeClassName : inactiveClassName
      }`}
      aria-label={label}
      title={label}
    >
      {children}
    </Link>
  );
};

const NavActions = ({ pathname }: NavActionsProps) => {
  const router = useRouter();
  const { user, logout: logoutAccount } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const session: AuthSession | null = user
    ? {
        user: {
          name: user.full_name,
          email: user.email,
          role:
            user.role === "ADMIN" || user.role === "SUPER_ADMIN"
              ? "admin"
              : "user",
        },
      }
    : null;

  const dashboardHref = session?.user.role === "admin" ? "/admin" : "/dashboard";

  const logout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await Promise.all([
        logoutAccount(),
        new Promise((resolve) => window.setTimeout(resolve, 500)),
      ]);
      router.replace("/auth/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="ml-auto flex items-center gap-1.5 lg:ml-3">
      <ThemeToggle />
      <span className="hidden sm:block">
        <IconLink
          href="/wishlist"
          label="Wishlist"
          active={isActiveRoute(pathname, "/wishlist")}
          activeClassName="bg-rose-50 text-rose-600"
          inactiveClassName="text-[#64748b] hover:bg-rose-50 hover:text-rose-600"
        >
          <FaHeart className="size-4" />
        </IconLink>
      </span>

      <IconLink
        href="/cart"
        label="Cart"
        active={isActiveRoute(pathname, "/cart")}
        activeClassName="bg-[#eef2ff] text-[#4338ca]"
        inactiveClassName="text-[#64748b] hover:bg-[#eef2ff] hover:text-[#4338ca]"
      >
        <FaShoppingCart className="size-4" />
      </IconLink>

      <span className="mx-1 hidden h-7 w-px bg-slate-200 sm:block" />

      {session ? (
        <Dropdown
          label="Open account menu"
          trigger={(open) => (
            <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#c7d2fe] bg-white px-3 text-sm font-bold text-[#4338ca] transition hover:border-[#818cf8] hover:bg-[#eef2ff] sm:px-4">
              <FiUser className="size-4" />
              <span className="hidden sm:inline">
                {session.user.role === "admin"
                  ? "Logged in as admin"
                  : "Logged in as user"}
              </span>
              <FiChevronDown
                className={`size-4 transition ${open ? "rotate-180" : ""}`}
              />
            </span>
          )}
        >
          {(close) => (
            <div
              role="menu"
              className="absolute right-0 top-[calc(100%+0.75rem)] z-20 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10"
            >
              <div className="border-b border-slate-100 px-4 py-4">
                <p className="truncate text-sm font-bold text-slate-900">
                  {session.user.name}
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {session.user.email ??
                    (session.user.role === "admin"
                      ? "Administrator"
                      : "Customer account")}
                </p>
              </div>
              <div className="p-2">
                <Link
                  href={dashboardHref}
                  role="menuitem"
                  onClick={close}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-indigo-700"
                >
                  <FiGrid className="size-4" />
                  Dashboard
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  disabled={isLoggingOut}
                  onClick={() => {
                    logout();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoggingOut ? (
                    <FiLoader className="size-4 animate-spin" />
                  ) : (
                    <FiLogOut className="size-4" />
                  )}
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          )}
        </Dropdown>
      ) : (
        <>
          <Link
            href="/auth/login"
            className="hidden h-10 items-center justify-center rounded-xl border border-[#c7d2fe] bg-white px-3 text-sm font-bold text-[#4338ca] transition hover:border-[#818cf8] hover:bg-[#eef2ff] sm:inline-flex sm:px-4"
          >
            Sign in
          </Link>

          <Link
            href="/auth/register"
            className="hidden h-10 items-center justify-center rounded-xl bg-[#4f46e5] px-4 text-sm font-bold text-white shadow-md shadow-[#4f46e5]/20 transition hover:bg-[#4338ca] xl:inline-flex"
          >
            Create account
          </Link>
        </>
      )}

      <MobileMenu
        pathname={pathname}
        session={session}
        dashboardHref={dashboardHref}
        onLogout={logout}
        isLoggingOut={isLoggingOut}
      />
    </div>
  );
};

const MobileMenu = ({
  pathname,
  session,
  dashboardHref,
  onLogout,
  isLoggingOut,
}: NavActionsProps & {
  session: AuthSession | null;
  dashboardHref: string;
  onLogout: () => void;
  isLoggingOut: boolean;
}) => {
  return (
    <div className="dropdown dropdown-end lg:hidden">
      <button
        type="button"
        tabIndex={0}
        className="grid size-10 place-items-center rounded-xl text-[#312e81] transition hover:bg-[#eef2ff]"
        aria-label="Open navigation menu"
      >
        <FaBars className="size-5" />
      </button>

      <div
        tabIndex={0}
        className="dropdown-content z-10 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl"
      >
        <NavLinks pathname={pathname} mobile />
        <div className="my-2 h-px bg-slate-100" />
        {session ? (
          <div className="space-y-2">
            <p className="px-4 text-xs font-semibold text-slate-500">
              {session.user.role === "admin"
                ? "Logged in as admin"
                : "Logged in as user"}
            </p>
            <Link
              href={dashboardHref}
              className="block rounded-xl bg-[#eef2ff] px-4 py-3 text-center text-sm font-bold text-[#4338ca] hover:bg-[#e0e7ff]"
            >
              Dashboard
            </Link>
            <button
              type="button"
              disabled={isLoggingOut}
              onClick={onLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-center text-sm font-bold text-rose-600 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoggingOut && <FiLoader className="size-4 animate-spin" />}
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        ) : (
          <div className="grid gap-2">
            <Link
              href="/auth/login"
              className="block rounded-xl border border-[#c7d2fe] bg-white px-4 py-3 text-center text-sm font-bold text-[#4338ca] hover:bg-[#eef2ff]"
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="block rounded-xl bg-[#4f46e5] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#4338ca]"
            >
              Create account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavActions;
