"use client";

import { usePathname } from "next/navigation";
import NavActions from "./nav-actions";
import NavBrand from "./nav-brand";
import NavLinks from "./nav-links";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 text-[#1e1b4b] shadow-sm backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <NavBrand />
        <NavLinks pathname={pathname} />
        <NavActions pathname={pathname} />
      </div>
    </header>
  );
};

export default Navbar;
