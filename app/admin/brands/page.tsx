import type { Metadata } from "next";
import {
  FiEdit2,
  FiExternalLink,
  FiMoreHorizontal,
  FiPlus,
  FiTag,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Brands",
};

const brands = [
  {
    name: "Northstar",
    initials: "NS",
    products: 14,
    colour: "bg-indigo-600",
    website: "northstar.example",
  },
  {
    name: "Cloudline",
    initials: "CL",
    products: 9,
    colour: "bg-sky-500",
    website: "cloudline.example",
  },
  {
    name: "Atelier",
    initials: "AT",
    products: 12,
    colour: "bg-slate-800",
    website: "atelier.example",
  },
  {
    name: "Solis",
    initials: "SO",
    products: 7,
    colour: "bg-amber-500",
    website: "solis.example",
  },
  {
    name: "Pulse",
    initials: "PL",
    products: 10,
    colour: "bg-fuchsia-500",
    website: "pulse.example",
  },
];

const BrandsPage = () => {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-indigo-600">
            Catalogue partners
          </p>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
            Brands
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Keep product makers and supplier information tidy in one place.
          </p>
        </div>
        <button className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 sm:self-auto">
          <FiPlus className="size-4" /> Add brand
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-gradient-to-r from-[#111136] to-indigo-900 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="grid size-11 place-items-center rounded-xl bg-white/10 text-indigo-200">
              <FiTag className="size-5" />
            </div>
            <h3 className="mt-5 text-2xl font-black">
              {brands.length} trusted catalogue brands
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100/65">
              Every brand is active and currently visible across the Broadway
              Store catalogue.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/8 px-5 py-4">
              <p className="text-2xl font-black">
                {brands.reduce((total, brand) => total + brand.products, 0)}
              </p>
              <p className="mt-1 text-[11px] text-indigo-200/70">Products</p>
            </div>
            <div className="rounded-xl bg-white/8 px-5 py-4">
              <p className="text-2xl font-black">100%</p>
              <p className="mt-1 text-[11px] text-indigo-200/70">Active</p>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h3 className="font-bold text-slate-900">All brands</h3>
            <p className="mt-1 text-xs text-slate-500">
              Manage brand details and catalogue visibility
            </p>
          </div>
          <button
            type="button"
            aria-label="More brand options"
            className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <FiMoreHorizontal className="size-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-6 py-3">Brand</th>
                <th className="px-6 py-3">Website</th>
                <th className="px-6 py-3">Products</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {brands.map((brand) => (
                <tr key={brand.name} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid size-10 place-items-center rounded-xl text-xs font-black text-white ${brand.colour}`}
                      >
                        {brand.initials}
                      </span>
                      <span className="font-bold text-slate-800">
                        {brand.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      {brand.website}
                      <FiExternalLink className="size-3.5" />
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700">
                    {brand.products}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      aria-label={`Edit ${brand.name}`}
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

export default BrandsPage;
