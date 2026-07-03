import {
  getBrands,
  getCategories,
  getPrice,
  getProducts,
} from "@/api/catalog.api";
import PageTitle from "@/components/admin/page-title";
import type { IconType } from "react-icons";
import {
  FiBox,
  FiDollarSign,
  FiLayers,
  FiPackage,
  FiTag,
} from "react-icons/fi";

type DashboardOverviewProps = Readonly<{
  role: "admin" | "user";
}>;

const DashboardOverview = async ({ role }: DashboardOverviewProps) => {
  const [products, brands, categories] = await Promise.all([
    getProducts().catch(() => []),
    getBrands().catch(() => []),
    getCategories().catch(() => []),
  ]);

  const inventoryValue = products.reduce(
    (total, product) => total + getPrice(product) * product.stock,
    0,
  );

  const stats: {
    label: string;
    value: string;
    detail: string;
    icon: IconType;
    colour: string;
  }[] = [
    {
      label: "Products",
      value: products.length.toString(),
      detail: "catalogue items",
      icon: FiPackage,
      colour: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Categories",
      value: categories.length.toString(),
      detail: "active groups",
      icon: FiLayers,
      colour: "bg-sky-50 text-sky-600",
    },
    {
      label: "Brands",
      value: brands.length.toString(),
      detail: "catalogue partners",
      icon: FiTag,
      colour: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Inventory value",
      value: `$${inventoryValue.toFixed(2)}`,
      detail: "price x stock",
      icon: FiDollarSign,
      colour: "bg-violet-50 text-violet-600",
    },
  ];

  const recentProducts = products.slice(0, 6);

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <PageTitle
        eyebrow={role === "admin" ? "Admin overview" : "Account overview"}
        title="Dashboard"
        description={
          role === "admin"
            ? "Live catalogue totals from your backend."
            : "Your account dashboard with read-only store information."
        }
        linkText={role === "admin" ? "View products" : undefined}
        link="/admin/products"
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className={`grid size-11 place-items-center rounded-xl ${stat.colour}`}>
              <stat.icon className="size-5" />
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">
              {stat.label}
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-2xl font-black tracking-tight text-slate-900">
                {stat.value}
              </p>
              <span className="text-[11px] text-slate-400">{stat.detail}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <h3 className="font-bold text-slate-900">Recent products</h3>
          <p className="mt-1 text-xs text-slate-500">
            Latest catalogue items from the backend
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {recentProducts.map((product) => (
                <tr key={product._id} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                        <FiBox className="size-4" />
                      </span>
                      <span className="font-bold text-slate-800">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700">
                    ${getPrice(product).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                      {product.stock > 0 ? "In stock" : "Out of stock"}
                    </span>
                  </td>
                </tr>
              ))}
              {recentProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-sm font-medium text-slate-500"
                  >
                    No backend products found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DashboardOverview;
