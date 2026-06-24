import Link from "next/link";
import { FiArrowLeft, FiGrid, FiSearch } from "react-icons/fi";

const AdminNotFound = () => {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-13rem)] max-w-3xl place-items-center py-10">
      <section className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white text-center shadow-sm">
        <div className="bg-gradient-to-br from-[#111136] via-indigo-950 to-indigo-800 px-6 py-12 text-white sm:px-12">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-white/10 text-indigo-200 ring-1 ring-white/15">
            <FiSearch className="size-7" />
          </div>
          <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.24em] text-indigo-300">
            Error 404
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Admin page not found
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-indigo-100/70">
            The dashboard page you requested does not exist or may have been
            moved.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 px-6 py-6 sm:flex-row">
          <Link
            href="/admin"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            <FiGrid className="size-4" />
            Return to dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-indigo-700"
          >
            <FiArrowLeft className="size-4" />
            Visit storefront
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdminNotFound;
