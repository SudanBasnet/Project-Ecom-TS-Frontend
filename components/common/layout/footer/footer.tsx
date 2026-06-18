import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/#categories", label: "Categories" },
  { href: "/#featured", label: "Featured" },
  { href: "/auth/login", label: "Sign in" },
];

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center border-t border-[#c7d2fe] bg-white px-6 py-6 text-[#64748b]">
      <aside className="gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-lg font-bold text-[#312e81]"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-[#4f46e5] text-white shadow-md shadow-[#4f46e5]/20">
            <FaShoppingBag className="size-4" />
          </span>
          Broadway Store
        </Link>
        <p className="text-sm">Fresh picks, smoother checkout.</p>
      </aside>

      <nav className="grid grid-flow-col gap-4 text-sm font-semibold">
        {footerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-[#4338ca]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
