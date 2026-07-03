import PageTitle from "@/components/admin/page-title";
import type { Metadata } from "next";
import { FiUsers } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Users",
};

const UsersPage = () => {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <PageTitle
        eyebrow="Customer management"
        title="All users"
        description="Customer account data will appear here when the backend users API is connected."
        linkText="Dashboard"
        link="/admin"
        backLink
      />

      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
          <FiUsers className="size-5" />
        </div>
        <h2 className="mt-4 text-lg font-bold text-slate-900">
          No backend users found
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          Connect the users endpoint to review real customer accounts and
          activity.
        </p>
      </section>
    </div>
  );
};

export default UsersPage;
