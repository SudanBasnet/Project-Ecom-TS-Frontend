import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/wishlist", label: "Wishlist" },
];

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-10 text-[#64748b]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg font-bold text-[#312e81]"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-[#4f46e5] text-white shadow-md shadow-[#4f46e5]/20">
              <FaShoppingBag className="size-4" />
            </span>
            Broadway Store
          </Link>
          <p className="mt-3 text-sm">Fresh picks, smoother checkout.</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-semibold">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[#4338ca]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-sm">
          © {new Date().getFullYear()} Broadway Store
        </p>
      </div>
    </footer>
  );
};

export default Footer;
