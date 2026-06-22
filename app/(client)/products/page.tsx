import ProductVisual from "@/components/common/ui/product-visual";
import { products } from "@/data/products";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
};

const ProductsPage = () => {
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <main className="flex-1 pb-20">
      <section className="border-b border-[#e0e7ff] bg-gradient-to-br from-[#eef2ff] via-white to-[#f5f3ff] px-6 py-14 sm:py-18">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#4f46e5]">
            Product catalogue
          </p>
          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-black tracking-tight text-[#1e1b4b] sm:text-5xl">
                Find your next favourite.
              </h1>
              <p className="mt-4 max-w-xl leading-7 text-[#64748b]">
                Browse the starter catalogue. These products are shared dummy
                data that can later be replaced by your API response.
              </p>
            </div>
            <p className="rounded-full border border-[#c7d2fe] bg-white px-4 py-2 text-sm font-semibold text-[#4338ca] shadow-sm">
              {products.length} products
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-2 overflow-x-auto pb-3">
            {categories.map((category, index) => (
              <span
                key={category}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                  index === 0
                    ? "bg-[#4f46e5] text-white"
                    : "border border-slate-200 bg-white text-[#64748b]"
                }`}
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#c7d2fe] hover:shadow-xl hover:shadow-indigo-100"
              >
                <div className="overflow-hidden">
                  <ProductVisual
                    name={product.name}
                    accent={product.accent}
                    className="aspect-[4/3] transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-[#6366f1]">
                    {product.category}
                  </p>
                  <div className="mt-1 flex items-start justify-between gap-4">
                    <h2 className="text-xl font-bold text-[#1e1b4b]">
                      {product.name}
                    </h2>
                    <span className="font-bold text-[#4338ca]">
                      ${product.price}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#64748b]">
                    {product.description}
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#eef2ff] px-4 py-3 text-sm font-bold text-[#4338ca] transition hover:bg-[#4f46e5] hover:text-white"
                  >
                    View details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
