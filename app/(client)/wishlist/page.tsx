import ProductVisual from "@/components/common/ui/product-visual";
import { products } from "@/data/products";
import type { Metadata } from "next";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Wishlist",
};

const WishlistPage = () => {
  const savedProducts = products.slice(1, 3);

  return (
    <main className="flex-1 px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <div className="grid size-12 place-items-center rounded-2xl bg-[#fee2e2] text-[#e11d48]">
            <FaHeart />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#1e1b4b]">Your wishlist</h1>
            <p className="mt-1 text-[#64748b]">
              Dummy saved items for the future authenticated customer wishlist.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {savedProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-3xl border border-[#e0e7ff] bg-white shadow-sm"
            >
              <ProductVisual name={product.name} accent={product.accent} />
              <div className="p-5">
                <div className="flex justify-between gap-4">
                  <h2 className="font-bold text-[#1e1b4b]">{product.name}</h2>
                  <span className="font-bold text-[#4338ca]">
                    ${product.price}
                  </span>
                </div>
                <Link
                  href={`/products/${product.id}`}
                  className="btn mt-5 w-full border-[#c7d2fe] bg-white text-[#4338ca] hover:bg-[#eef2ff]"
                >
                  View product
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default WishlistPage;
