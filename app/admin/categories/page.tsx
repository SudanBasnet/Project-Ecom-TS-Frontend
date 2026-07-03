import { getCategories, getProducts } from "@/api/catalog.api";
import CategoryTable, {
  type CategoryTableRow,
} from "@/components/admin/category-table";
import PageTitle from "@/components/admin/page-title";
import type { Metadata } from "next";
import { FiLayers, FiMoreHorizontal } from "react-icons/fi";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Categories",
};

const categoryAccents = [
  "from-indigo-500 to-violet-400",
  "from-sky-500 to-cyan-300",
  "from-slate-700 to-slate-400",
  "from-amber-400 to-orange-300",
  "from-fuchsia-500 to-pink-400",
  "from-emerald-500 to-teal-300",
];

const CategoriesPage = async () => {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ]);

  const rows: CategoryTableRow[] = categories.map((category, index) => ({
    id: category._id,
    name: category.name,
    description: category.description || "No description",
    products: products.filter((product) => {
      const productCategory = product.category;
      return typeof productCategory === "object"
        ? productCategory?._id === category._id
        : productCategory === category._id;
    }).length,
    updated: category.updatedAt
      ? new Date(category.updatedAt).toLocaleDateString()
      : "Recently",
    accent: categoryAccents[index % categoryAccents.length],
    status: "Active",
  }));

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <PageTitle
        eyebrow="Catalogue organisation"
        title="All categories"
        description="Group related products to make your catalogue easier to browse and manage."
        linkText="Add new"
        link="/admin/categories/create"
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <FiLayers className="size-5" />
          </div>
          <p className="mt-4 text-2xl font-black text-slate-900">
            {rows.length}
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
            {rows.length}
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
              {rows.length} categories in your store
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

        <CategoryTable categories={rows} />
      </section>
    </div>
  );
};

export default CategoriesPage;
