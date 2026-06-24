import PageTitle from "@/components/admin/page-title";
import type { Metadata } from "next";
import {
  FiMail,
  FiMoreHorizontal,
  FiShield,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Users",
};

const users = [
  {
    name: "Olivia Martin",
    initials: "OM",
    email: "olivia.martin@example.com",
    orders: 12,
    spent: 1264,
    joined: "May 18, 2026",
    status: "Active",
    colour: "bg-indigo-600",
  },
  {
    name: "Jackson Lee",
    initials: "JL",
    email: "jackson.lee@example.com",
    orders: 8,
    spent: 742,
    joined: "May 26, 2026",
    status: "Active",
    colour: "bg-sky-500",
  },
  {
    name: "Sophia Brown",
    initials: "SB",
    email: "sophia.brown@example.com",
    orders: 5,
    spent: 486,
    joined: "June 2, 2026",
    status: "Active",
    colour: "bg-violet-500",
  },
  {
    name: "Noah Wilson",
    initials: "NW",
    email: "noah.wilson@example.com",
    orders: 3,
    spent: 228,
    joined: "June 11, 2026",
    status: "Inactive",
    colour: "bg-amber-500",
  },
  {
    name: "Ava Thompson",
    initials: "AT",
    email: "ava.thompson@example.com",
    orders: 1,
    spent: 96,
    joined: "June 20, 2026",
    status: "Active",
    colour: "bg-emerald-500",
  },
];

const userStatusStyles: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  Inactive: "bg-slate-100 text-slate-600 ring-slate-500/10",
};

const UsersPage = () => {
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const totalRevenue = users.reduce((total, user) => total + user.spent, 0);

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <PageTitle
        eyebrow="Customer management"
        title="All users"
        description="Review customer accounts, order activity, and account status."
        linkText="Dashboard"
        link="/admin"
        backLink
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <FiUsers className="size-5" />
          </div>
          <p className="mt-4 text-2xl font-black text-slate-900">
            {users.length}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Total customers
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <FiUserCheck className="size-5" />
          </div>
          <p className="mt-4 text-2xl font-black text-slate-900">
            {activeUsers}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Active accounts
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid size-10 place-items-center rounded-xl bg-violet-50 text-violet-600">
            <FiShield className="size-5" />
          </div>
          <p className="mt-4 text-2xl font-black text-slate-900">1</p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Administrator
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Customer value
          </p>
          <p className="mt-4 text-2xl font-black text-slate-900">
            ${totalRevenue.toLocaleString()}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Total recorded spend
          </p>
        </article>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h3 className="font-bold text-slate-900">All users</h3>
            <p className="mt-1 text-xs text-slate-500">
              Customer accounts and purchasing activity
            </p>
          </div>
          <button
            type="button"
            aria-label="More user options"
            className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <FiMoreHorizontal className="size-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Joined</th>
                <th className="px-6 py-3">Orders</th>
                <th className="px-6 py-3">Total spent</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {users.map((user) => (
                <tr key={user.email} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-xl text-xs font-black text-white ${user.colour}`}
                      >
                        {user.initials}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800">{user.name}</p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                          <FiMail className="size-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{user.joined}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">
                    {user.orders}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    ${user.spent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${userStatusStyles[user.status]}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      aria-label={`Open actions for ${user.name}`}
                      className="inline-grid size-9 place-items-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <FiMoreHorizontal className="size-4" />
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

export default UsersPage;
