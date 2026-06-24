import PageTitle from "@/components/admin/page-title";
import { products } from "@/data/products";
import type { IconType } from "react-icons";
import {
  FiDollarSign,
  FiPackage,
  FiShoppingBag,
  FiTrendingUp,
  FiUserPlus,
} from "react-icons/fi";

const stats: {
  label: string;
  value: string;
  change: string;
  detail: string;
  icon: IconType;
  colour: string;
}[] = [
  {
    label: "Total revenue",
    value: "$24,780",
    change: "+12.5%",
    detail: "vs. last month",
    icon: FiDollarSign,
    colour: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Orders",
    value: "384",
    change: "+8.2%",
    detail: "vs. last month",
    icon: FiShoppingBag,
    colour: "bg-amber-50 text-amber-600",
  },
  {
    label: "New customers",
    value: "128",
    change: "+18.7%",
    detail: "vs. last month",
    icon: FiUserPlus,
    colour: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Products",
    value: products.length.toString(),
    change: "All active",
    detail: "catalogue items",
    icon: FiPackage,
    colour: "bg-violet-50 text-violet-600",
  },
];

const sales = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 62 },
  { month: "Mar", value: 52 },
  { month: "Apr", value: 78 },
  { month: "May", value: 67 },
  { month: "Jun", value: 92 },
  { month: "Jul", value: 82 },
];

const orders = [
  {
    id: "#BW-1048",
    customer: "Olivia Martin",
    product: "Studio Headphones",
    total: "$149.00",
    status: "Paid",
  },
  {
    id: "#BW-1047",
    customer: "Jackson Lee",
    product: "Everyday Backpack",
    total: "$79.00",
    status: "Processing",
  },
  {
    id: "#BW-1046",
    customer: "Sophia Brown",
    product: "Classic Watch",
    total: "$125.00",
    status: "Paid",
  },
  {
    id: "#BW-1045",
    customer: "Noah Wilson",
    product: "Cloud Sneakers",
    total: "$96.00",
    status: "Shipped",
  },
];

const statusStyles: Record<string, string> = {
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  Processing: "bg-amber-50 text-amber-700 ring-amber-600/10",
  Shipped: "bg-indigo-50 text-indigo-700 ring-indigo-600/10",
};

const DashboardPage = () => {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <PageTitle
        eyebrow="Admin overview"
        title="Dashboard"
        description="Here’s what’s happening with your store today."
        linkText="View orders"
        link="/admin/orders"
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className={`grid size-11 place-items-center rounded-xl ${stat.colour}`}>
                <stat.icon className="size-5" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                {stat.change.startsWith("+") && (
                  <FiTrendingUp className="size-3.5" />
                )}
                {stat.change}
              </span>
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

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900">Revenue overview</h3>
              <p className="mt-1 text-xs text-slate-500">
                Monthly performance for 2026
              </p>
            </div>
            <select
              aria-label="Revenue period"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 outline-none"
              defaultValue="7-months"
            >
              <option value="7-months">Last 7 months</option>
              <option value="year">This year</option>
            </select>
          </div>

          <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
            {sales.map((item) => (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col justify-end gap-3"
              >
                <div className="group relative flex flex-1 items-end rounded-lg bg-slate-50">
                  <div
                    className="w-full rounded-lg bg-gradient-to-t from-indigo-600 to-indigo-400 transition hover:from-indigo-700 hover:to-violet-500"
                    style={{ height: `${item.value}%` }}
                  >
                    <span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-[10px] font-bold text-white group-hover:block">
                      ${item.value * 58}
                    </span>
                  </div>
                </div>
                <span className="text-center text-[11px] font-semibold text-slate-400">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-[#111136] p-6 text-white shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">
            Store health
          </p>
          <h3 className="mt-2 text-xl font-black">You&apos;re doing great.</h3>
          <p className="mt-2 text-sm leading-6 text-indigo-100/65">
            Revenue and customer growth are both trending upward this month.
          </p>

          <div className="mt-8 grid place-items-center">
            <div className="grid size-40 place-items-center rounded-full bg-[conic-gradient(#818cf8_0deg_316deg,rgba(255,255,255,0.1)_316deg_360deg)]">
              <div className="grid size-28 place-items-center rounded-full bg-[#111136] text-center">
                <div>
                  <p className="text-3xl font-black">88%</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-indigo-300">
                    Health score
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/8 p-3">
              <p className="text-xl font-black">4.8</p>
              <p className="mt-1 text-[11px] text-indigo-200/70">Avg. rating</p>
            </div>
            <div className="rounded-xl bg-white/8 p-3">
              <p className="text-xl font-black">2.4%</p>
              <p className="mt-1 text-[11px] text-indigo-200/70">Return rate</p>
            </div>
          </div>
        </article>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h3 className="font-bold text-slate-900">Recent orders</h3>
            <p className="mt-1 text-xs text-slate-500">
              Latest customer purchases
            </p>
          </div>
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-bold text-indigo-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{order.product}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {order.total}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </span>
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

export default DashboardPage;
