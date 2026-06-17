import Link from "next/link";
import { FaBars, FaShoppingBag } from "react-icons/fa";

const navLinks = [
  { href: "/#categories", label: "Categories" },
  { href: "/#featured", label: "Featured" },
  { href: "/#new-arrivals", label: "New arrivals" },
];

const Navbar = () => {
  return (
    <div className="navbar sticky top-0 z-50 border-b border-[#c7d2fe] bg-white/95 px-4 text-[#1e1b4b] shadow-sm backdrop-blur sm:px-6 lg:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            type="button"
            tabIndex={0}
            className="btn btn-ghost btn-square text-[#312e81] lg:hidden"
            aria-label="Open navigation"
          >
            <FaBars className="size-5" />
          </button>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-10 mt-3 w-52 rounded-box border border-[#c7d2fe] bg-white p-2 text-[#312e81] shadow-xl"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/"
          className="btn btn-ghost gap-2 px-2 text-xl font-bold text-[#312e81] hover:bg-[#eef2ff]"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-[#4f46e5] text-white shadow-md shadow-[#4f46e5]/20">
            <FaShoppingBag className="size-4" />
          </span>
          Broadway Store
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 px-1 text-sm font-semibold text-[#64748b]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-xl hover:bg-[#eef2ff] hover:text-[#4338ca]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <Link
          href="/auth/login"
          className="btn btn-ghost hidden text-[#4338ca] hover:bg-[#eef2ff] sm:inline-flex"
        >
          Sign in
        </Link>
        <Link
          href="/auth/register"
          className="btn border-0 bg-[#4f46e5] text-white shadow-lg shadow-[#4f46e5]/20 hover:bg-[#4338ca]"
        >
          Create account
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
