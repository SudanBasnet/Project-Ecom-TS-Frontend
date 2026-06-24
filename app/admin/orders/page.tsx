import PageTitle from "@/components/admin/page-title";
import type { Metadata } from "next";
import {
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiEye,
  FiMoreHorizontal,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Orders",
};

const orders = [
  {
    id: "#BW-1048",
    customer: "Olivia Martin",
    email: "olivia.martin@example.com",
    items: 2,
    total: 228,
    date: "June 24, 2026",
    payment: "Paid",
    status: "Processing",
  },
  {
    id: "#BW-1047",
    customer: "Jackson Lee",
    email: "jackson.lee@example.com",
    items: 1,
    total: 79,
    date: "June 23, 2026",
    payment: "Paid",
    status: "Shipped",
  },
  {
    id: "#BW-1046",
    customer: "Sophia Brown",
    email: "sophia.brown@example.com",
    items: 3,
    total: 274,
    date: "June 22, 2026",
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "#BW-1045",
    customer: "Noah Wilson",
    email: "noah.wilson@example.com",
    items: 1,
    total: 96,
    date: "June 21, 2026",
    payment: "Pending",
    status: "Pending",
  },
  {
    id: "#BW-1044",
    customer: "Ava Thompson",
    email: "ava.thompson@example.com",
    items: 2,
    total: 173,
    date: "June 20, 2026",
    payment: "Paid",
    status: "Delivered",
  },
];

const orderStatusStyles: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/10",
  Processing: "bg-sky-50 text-sky-700 ring-sky-600/10",
  Shipped: "bg-indigo-50 text-indigo-700 ring-indigo-600/10",
  Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
};

const paymentStyles: Record<string, string> = {
  Paid: "text-emerald-700",
  Pending: "text-amber-700",
};

const OrdersPage = () => {
  const totalRevenue = orders.reduce((total, order) => total + order.total, 0);
  const openOrders = orders.filter(
    (order) => order.status !== "Delivered",
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <PageTitle
        eyebrow="Sales and fulfillment"
        title="All orders"
        description="Track payments, fulfillment progress, and customer purchases."
        linkText="Dashboard"
        link="/admin"
        backLink
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <FiShoppingBag className="size-5" />
          </div>
          <p className="mt-4 text-2xl font-black text-slate-900">
            {orders.length}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Total orders
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid size-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
            <FiClock className="size-5" />
          </div>
          <p className="mt-4 text-2xl font-black text-slate-900">
            {openOrders}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Awaiting fulfillment
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <FiCheckCircle className="size-5" />
          </div>
          <p className="mt-4 text-2xl font-black text-slate-900">
            {deliveredOrders}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">Delivered</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid size-10 place-items-center rounded-xl bg-violet-50 text-violet-600">
            <FiDollarSign className="size-5" />
          </div>
          <p className="mt-4 text-2xl font-black text-slate-900">
            ${totalRevenue.toLocaleString()}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Order value
          </p>
        </article>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h3 className="font-bold text-slate-900">Recent orders</h3>
            <p className="mt-1 text-xs text-slate-500">
              Payment and delivery status for customer purchases
            </p>
          </div>
          <button
            type="button"
            aria-label="More order options"
            className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <FiMoreHorizontal className="size-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Items</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Payment</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-bold text-indigo-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">
                      {order.customer}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {order.email}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{order.date}</td>
                  <td className="px-6 py-4 text-slate-600">{order.items}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    ${order.total.toFixed(2)}
                  </td>
                  <td
                    className={`px-6 py-4 font-semibold ${paymentStyles[order.payment]}`}
                  >
                    {order.payment}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${orderStatusStyles[order.status]}`}
                    >
                      {order.status === "Shipped" && (
                        <FiTruck className="size-3" />
                      )}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      aria-label={`View ${order.id}`}
                      className="inline-grid size-9 place-items-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <FiEye className="size-4" />
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

export default OrdersPage;
