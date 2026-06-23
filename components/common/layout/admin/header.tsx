"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiBell,
  FiChevronDown,
  FiExternalLink,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import Dropdown from "../../ui/dropdown";
import { getAdminPageTitle } from "./admin.config";

const menuLinkClass =
  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-indigo-700";

const AdminHeader = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();
  const title = getAdminPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
        >
          <FiMenu className="size-5" />
        </button>

        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
            Admin workspace
          </p>
          <h1 className="truncate text-xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <label className="relative hidden md:block">
            <span className="sr-only">Search dashboard</span>
            <FiSearch className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search dashboard"
              className="h-11 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </label>

          <button
            type="button"
            aria-label="Notifications"
            className="relative grid size-11 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <FiBell className="size-5" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full border-2 border-white bg-rose-500" />
          </button>

          <Dropdown
            label="Open account menu"
            trigger={(open) => (
              <span className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-1.5 pr-2.5 text-left transition hover:border-indigo-200 hover:bg-indigo-50/40">
                <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-500 text-xs font-black text-white">
                  BS
                </span>
                <span className="hidden leading-tight sm:block">
                  <span className="block text-sm font-bold text-slate-800">
                    Store admin
                  </span>
                  <span className="block text-[11px] text-slate-500">
                    Administrator
                  </span>
                </span>
                <FiChevronDown
                  className={`hidden size-4 text-slate-400 transition sm:block ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </span>
            )}
          >
            {(close) => (
              <div
                role="menu"
                className="absolute right-0 top-[calc(100%+0.75rem)] w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10"
              >
                <div className="border-b border-slate-100 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-100 text-indigo-700">
                      <FiUser className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-900">
                        Store admin
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        admin@broadway.store
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <Link
                    href="/admin"
                    role="menuitem"
                    onClick={close}
                    className={menuLinkClass}
                  >
                    <FiGrid className="size-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/"
                    target="_blank"
                    role="menuitem"
                    onClick={close}
                    className={menuLinkClass}
                  >
                    <FiExternalLink className="size-4" />
                    View storefront
                  </Link>
                </div>

                <div className="border-t border-slate-100 p-2">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      close();
                      router.replace("/auth/login");
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                  >
                    <FiLogOut className="size-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
