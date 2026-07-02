import {
  getCategoryName,
  getPrice,
  getProducts,
} from "@/api/catalog.api";
import PageTitle from "@/components/admin/page-title";
import type { Metadata } from "next";
import { FiEdit2, FiMoreHorizontal, FiPackage } from "react-icons/fi";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
};

const ProductsPage = async () => {
  const products = await getProducts().catch(() => []);
  const inventoryValue = products.reduce(
    (total, product) => total + getPrice(product),
    0,
  );

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <PageTitle
        eyebrow="Catalogue management"
        title="All products"
        description="Review and manage every item currently available in your store."
        linkText="Add new"
        link="/admin/products/create"
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <FiPackage className="size-5" />
          </div>
          <p className="mt-4 text-2xl font-black text-slate-900">
            {products.length}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Total products
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active
          </p>
          <p className="mt-4 text-2xl font-black text-emerald-600">
            {products.length}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Visible on storefront
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Inventory value
          </p>
          <p className="mt-4 text-2xl font-black text-slate-900">
            ${inventoryValue.toFixed(2)}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            One unit of each product
          </p>
        </article>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h3 className="font-bold text-slate-900">All products</h3>
            <p className="mt-1 text-xs text-slate-500">
              {products.length} products in your catalogue
            </p>
          </div>
          <button
            type="button"
            aria-label="More product options"
            className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <FiMoreHorizontal className="size-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {products.map((product) => (
                <tr key={product._id} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white"
                      >
                        <FiPackage className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800">{product.name}</p>
                        <p className="mt-0.5 max-w-sm truncate text-xs text-slate-400">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {getCategoryName(product.category)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700">
                    ${getPrice(product).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      aria-label={`Edit ${product.name}`}
                      className="inline-grid size-9 place-items-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <FiEdit2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
