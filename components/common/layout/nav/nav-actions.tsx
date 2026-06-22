import Link from "next/link";
import { FaBars, FaHeart, FaShoppingCart } from "react-icons/fa";
import { isActiveRoute } from "./nav.config";
import NavLinks from "./nav-links";

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
  return (
    <div className="ml-auto flex items-center gap-1.5 lg:ml-3">
      <IconLink
        href="/wishlist"
        label="Wishlist"
        active={isActiveRoute(pathname, "/wishlist")}
        activeClassName="bg-rose-50 text-rose-600"
        inactiveClassName="text-[#64748b] hover:bg-rose-50 hover:text-rose-600"
      >
        <FaHeart className="size-4" />
      </IconLink>

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

      <Link
        href="/auth/login"
        className="inline-flex h-10 items-center justify-center rounded-xl border border-[#c7d2fe] bg-white px-3 text-sm font-bold text-[#4338ca] transition hover:border-[#818cf8] hover:bg-[#eef2ff] sm:px-4"
      >
        Sign in
      </Link>

      <Link
        href="/auth/register"
        className="hidden h-10 items-center justify-center rounded-xl bg-[#4f46e5] px-4 text-sm font-bold text-white shadow-md shadow-[#4f46e5]/20 transition hover:bg-[#4338ca] xl:inline-flex"
      >
        Create account
      </Link>

      <MobileMenu pathname={pathname} />
    </div>
  );
};

const MobileMenu = ({ pathname }: NavActionsProps) => {
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
        <Link
          href="/auth/register"
          className="block rounded-xl bg-[#4f46e5] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#4338ca]"
        >
          Create account
        </Link>
      </div>
    </div>
  );
};

export default NavActions;
