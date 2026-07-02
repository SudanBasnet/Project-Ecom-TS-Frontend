import BrandTable, {
  type BrandTableRow,
} from "@/components/admin/brand-table";
import PageTitle from "@/components/admin/page-title";
import type { Metadata } from "next";
import { FiMoreHorizontal, FiTag } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Brands",
};

const brands: BrandTableRow[] = [
  {
    name: "Northstar",
    initials: "NS",
    products: 14,
    colour: "bg-indigo-600",
    website: "northstar.example",
    status: "Active",
  },
  {
    name: "Cloudline",
    initials: "CL",
    products: 9,
    colour: "bg-sky-500",
    website: "cloudline.example",
    status: "Active",
  },
  {
    name: "Atelier",
    initials: "AT",
    products: 12,
    colour: "bg-slate-800",
    website: "atelier.example",
    status: "Active",
  },
  {
    name: "Solis",
    initials: "SO",
    products: 7,
    colour: "bg-amber-500",
    website: "solis.example",
    status: "Active",
  },
  {
    name: "Pulse",
    initials: "PL",
    products: 10,
    colour: "bg-fuchsia-500",
    website: "pulse.example",
    status: "Active",
  },
];

const BrandsPage = () => {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <PageTitle
        eyebrow="Catalogue partners"
        title="All brands"
        description="Keep product makers and supplier information tidy in one place."
        linkText="Add new"
        link="/admin/brands/create"
      />

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

        <BrandTable brands={brands} />
      </section>
    </div>
  );
};

export default BrandsPage;
