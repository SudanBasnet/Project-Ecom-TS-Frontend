import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";

const NavBrand = () => {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2.5 rounded-xl text-lg font-black text-[#312e81] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] sm:text-xl"
    >
      <span className="grid size-10 place-items-center rounded-xl bg-[#4f46e5] text-white shadow-md shadow-[#4f46e5]/20">
        <FaShoppingBag className="size-4" />
      </span>
      <span className="hidden sm:inline">Broadway Store</span>
    </Link>
  );
};

export default NavBrand;
