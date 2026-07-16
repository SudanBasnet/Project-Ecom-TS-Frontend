import { getCategories } from "@/api/catalog.api";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import CategoryList from "./list";
import CategorySectionMotion from "./section-motion";

const CategorySection = async () => {
  const categories = await getCategories().catch(() => []);

  return (
    <section className="relative overflow-hidden bg-[#f6f7fb] px-6 py-24 transition-colors dark:bg-slate-950">
      <div className="absolute -left-32 top-1/3 size-80 rounded-full bg-sky-200/45 blur-3xl dark:bg-sky-500/10" />
      <div className="absolute -right-32 bottom-0 size-96 rounded-full bg-indigo-200/45 blur-3xl dark:bg-indigo-500/10" />
      <div className="relative mx-auto max-w-7xl">
        <CategorySectionMotion>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
                Shop by world
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl dark:text-white">
                Start with what moves you.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-500 dark:text-slate-400">
                Explore the live catalogue through collections built around the
                way you work, unwind, move, and live.
              </p>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-indigo-500"
            >
              Explore all products
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-12">
            <CategoryList categories={categories} />
          </div>
        </CategorySectionMotion>
      </div>
    </section>
  );
};

export default CategorySection;
