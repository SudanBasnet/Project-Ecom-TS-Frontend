import { products } from "@/data/products";
import type { Metadata } from "next";
import { FiEdit2, FiLayers, FiMoreHorizontal, FiPlus } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Categories",
};

const categoryAccents: Record<string, string> = {
  Bags: "from-indigo-500 to-violet-400",
  Footwear: "from-sky-500 to-cyan-300",
  Accessories: "from-slate-700 to-slate-400",
  Clothing: "from-amber-400 to-orange-300",
  Electronics: "from-fuchsia-500 to-pink-400",
  Home: "from-emerald-500 to-teal-300",
};

const categories = [...new Set(products.map((product) => product.category))].map(
  (name, index) => ({
    name,
    products: products.filter((product) => product.category === name).length,
    status: "Active",
    updated: index < 2 ? "Today" : `${index + 1} days ago`,
    accent: categoryAccents[name],
  }),
);

const CategoriesPage = () => {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-indigo-600">
            Catalogue organisation
          </p>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
            Product categories
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Group related products to make your catalogue easier to browse and
            manage.
          </p>
        </div>
        <button className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 sm:self-auto">
          <FiPlus className="size-4" /> Add category
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <FiLayers className="size-5" />
          </div>
          <p className="mt-4 text-2xl font-black text-slate-900">
            {categories.length}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Total categories
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active
          </p>
          <p className="mt-4 text-2xl font-black text-emerald-600">
            {categories.length}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Visible on storefront
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Catalogue coverage
          </p>
          <p className="mt-4 text-2xl font-black text-slate-900">100%</p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Products categorised
          </p>
        </article>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h3 className="font-bold text-slate-900">All categories</h3>
            <p className="mt-1 text-xs text-slate-500">
              {categories.length} categories in your store
            </p>
          </div>
          <button
            type="button"
            aria-label="More category options"
            className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <FiMoreHorizontal className="size-5" />
          </button>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3 sm:p-6">
          {categories.map((category) => (
            <article
              key={category.name}
              className="group rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/60"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${category.accent} text-white shadow-sm`}
                >
                  <FiLayers className="size-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate font-bold text-slate-900">
                      {category.name}
                    </h3>
                    <button
                      type="button"
                      aria-label={`Edit ${category.name}`}
                      className="grid size-8 place-items-center rounded-lg text-slate-400 opacity-0 transition hover:bg-indigo-50 hover:text-indigo-600 group-hover:opacity-100"
                    >
                      <FiEdit2 className="size-4" />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {category.products} product
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                      {category.status}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      Updated {category.updated}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;
