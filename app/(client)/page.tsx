import {
  getCategoryName,
  getPrice,
  getProducts,
} from "@/api/catalog.api";
import ProductMedia from "@/components/common/ui/product-media";
import ProductVisual from "@/components/common/ui/product-visual";
import Link from "next/link";
import { FaArrowRight, FaShieldAlt, FaShippingFast } from "react-icons/fa";

export const dynamic = "force-dynamic";

const benefits = [
  {
    title: "Fast delivery",
    description: "Dummy delivery copy ready to replace with your real policy.",
    icon: FaShippingFast,
  },
  {
    title: "Secure checkout",
    description: "A placeholder for payment and buyer-protection details.",
    icon: FaShieldAlt,
  },
];

const HomePage = async () => {
  const products = await getProducts().catch(() => []);
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="flex-1">
      <section className="bg-[#eef2ff] px-6 py-16 text-[#1e1b4b] sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#4f46e5]">
              New season collection
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
              Useful products, picked for everyday life.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#64748b]">
              Browse the latest products from your connected backend catalogue.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="btn border-0 bg-[#4f46e5] text-white hover:bg-[#4338ca]"
              >
                Shop products <FaArrowRight />
              </Link>
              <Link
                href="/about"
                className="btn border-[#c7d2fe] bg-white text-[#4338ca] hover:bg-[#e0e7ff]"
              >
                About the store
              </Link>
            </div>
          </div>

          <ProductVisual
            name="Featured collection"
            accent="from-indigo-600 via-violet-500 to-fuchsia-400"
            className="aspect-square rounded-[2.5rem] shadow-2xl shadow-indigo-300/40"
          />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#4f46e5]">
                Featured products
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[#1e1b4b]">
                Start with these favourites
              </h2>
            </div>
            <Link
              href="/products"
              className="font-semibold text-[#4338ca] hover:underline"
            >
              View all products
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="group overflow-hidden rounded-3xl border border-[#e0e7ff] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <ProductMedia
                  name={product.name}
                  imageUrl={product.cover_image?.path}
                />
                <div className="p-5">
                  <p className="text-sm font-semibold text-[#6366f1]">
                    {getCategoryName(product.category)}
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-[#1e1b4b]">
                      {product.name}
                    </h3>
                    <span className="font-bold text-[#4338ca]">
                      ${getPrice(product).toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {featuredProducts.length === 0 && (
            <p className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm font-semibold text-slate-500">
              Add products in the admin area to feature them here.
            </p>
          )}

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="flex gap-4 rounded-3xl bg-[#eef2ff] p-6"
              >
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-[#4f46e5]">
                  <benefit.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1e1b4b]">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#64748b]">
                    {benefit.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
