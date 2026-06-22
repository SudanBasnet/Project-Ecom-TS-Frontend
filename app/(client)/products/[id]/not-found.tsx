import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="grid flex-1 place-items-center px-6 py-20 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4f46e5]">
          Product not found
        </p>
        <h1 className="mt-3 text-4xl font-black text-[#1e1b4b]">
          That product does not exist.
        </h1>
        <p className="mt-4 text-[#64748b]">
          Check the product address or return to the catalogue.
        </p>
        <Link
          href="/products"
          className="btn mt-7 border-0 bg-[#4f46e5] text-white hover:bg-[#4338ca]"
        >
          Browse products
        </Link>
      </div>
    </main>
  );
}
