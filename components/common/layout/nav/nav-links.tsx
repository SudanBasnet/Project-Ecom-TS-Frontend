import Link from "next/link";
import { isActiveRoute, NAV_ITEMS } from "./nav.config";

type NavLinksProps = {
  pathname: string;
  mobile?: boolean;
};

const NavLinks = ({ pathname, mobile = false }: NavLinksProps) => {
  if (mobile) {
    return (
      <nav className="grid gap-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-xl px-4 py-3 text-sm font-semibold ${
              isActiveRoute(pathname, item.href)
                ? "bg-[#eef2ff] text-[#4338ca]"
                : "text-[#475569] hover:bg-slate-50"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="ml-auto hidden items-center gap-1 lg:flex">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
            isActiveRoute(pathname, item.href)
              ? "bg-[#eef2ff] text-[#4338ca]"
              : "text-[#64748b] hover:bg-slate-50 hover:text-[#312e81]"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
