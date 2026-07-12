import {
  getArticles,
  getProducts,
} from "@/api/catalog.api";
import CategorySection from "@/components/Landing/category-section";
import CategorySectionSkeleton from "@/components/Landing/category-section/skeleton";
import Hero from "@/components/Landing/hero";
import StorefrontShowcase from "@/components/Landing/storefront-showcase";
import { Suspense } from "react";
import { FaShieldAlt, FaShippingFast } from "react-icons/fa";

export const dynamic = "force-dynamic";

const benefits = [
  {
    title: "Fast delivery",
    description: "Delivery details will reflect the store policy configured for your backend.",
    icon: FaShippingFast,
  },
  {
    title: "Secure checkout",
    description: "Checkout is prepared for your connected payment and account flow.",
    icon: FaShieldAlt,
  },
];

const HomePage = async () => {
  const products = await getProducts().catch(() => []);
  const articles = await getArticles().catch(() => []);

  return (
    <main className="flex-1">
      <Hero />
      <Suspense fallback={<CategorySectionSkeleton />}>
        <CategorySection />
      </Suspense>

      <StorefrontShowcase products={products} articles={articles} />

      <section className="bg-white px-6 py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="flex gap-4 rounded-3xl bg-[#eef2ff] p-6 dark:bg-slate-900"
              >
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-[#4f46e5] dark:bg-slate-800 dark:text-indigo-300">
                  <benefit.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1e1b4b] dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#64748b] dark:text-slate-400">
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
