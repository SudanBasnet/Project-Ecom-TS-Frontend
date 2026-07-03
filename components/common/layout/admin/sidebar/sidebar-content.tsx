"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX } from "react-icons/fi";
import { getAdminNavItems, isAdminRouteActive } from "../admin.config";

type SidebarLinksProps = {
  isOpen: boolean;
  onClose: () => void;
  role?: "admin" | "user";
};

const SidebarLinks = ({
  isOpen,
  onClose,
  role = "admin",
}: SidebarLinksProps) => {
  const pathname = usePathname();
  const navItems = getAdminNavItems(role);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-indigo-100 bg-[#111136] font-sans tracking-normal text-white shadow-2xl shadow-indigo-950/20 transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <Link
          href={role === "admin" ? "/admin" : "/dashboard"}
          onClick={onClose}
          className="flex items-center gap-3"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-indigo-500 font-mono text-base font-bold tracking-tight shadow-lg shadow-indigo-950/40">
            B
          </span>
          <span>
            <span className="block text-lg font-bold leading-5 tracking-[-0.025em]">
              Broadway
            </span>
            <span className="mt-1 block font-mono text-[9px] font-medium uppercase leading-none tracking-[0.16em] text-indigo-300">
              {role === "admin" ? "Store admin" : "Member dashboard"}
            </span>
          </span>
        </Link>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="ml-auto grid size-9 place-items-center rounded-lg text-indigo-200 transition hover:bg-white/10 lg:hidden"
        >
          <FiX className="size-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="px-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-indigo-300/70">
          {role === "admin" ? "Store management" : "Account"}
        </p>

        <nav className="mt-3 space-y-1.5" aria-label="Admin navigation">
          {navItems.map((item) => {
            const active = isAdminRouteActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-medium leading-5 tracking-[-0.01em] transition ${
                  active
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-950/30"
                    : "text-indigo-100/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="size-5" />
                <span>{item.label}</span>
                {active && (
                  <span className="ml-auto size-1.5 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarLinks;
