import type { Metadata } from "next";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Wishlist",
};

const WishlistPage = () => {
  return (
    <main className="flex-1 px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <div className="grid size-12 place-items-center rounded-2xl bg-[#fee2e2] text-[#e11d48]">
            <FaHeart />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#1e1b4b]">
              Your wishlist
            </h1>
            <p className="mt-1 text-[#64748b]">
              Saved products will appear here when wishlist data is connected.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm font-semibold text-slate-500">
            No saved products yet.
          </p>
          <Link
            href="/products"
            className="btn mt-5 border-0 bg-[#4f46e5] text-white hover:bg-[#4338ca]"
          >
            Browse products
          </Link>
        </div>
      </div>
    </main>
  );
};

export default WishlistPage;
