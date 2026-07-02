import { getCategoryName, getPrice, getProduct } from "@/api/catalog.api";
import ProductMedia from "@/components/common/ui/product-media";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex-1 px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/products"
          className="text-sm font-semibold text-[#4338ca] hover:underline"
        >
          ← Back to products
        </Link>

        <div className="mt-6 grid overflow-hidden rounded-[2rem] border border-[#e0e7ff] bg-white shadow-xl shadow-indigo-100 lg:grid-cols-2">
          <ProductMedia
            name={product.name}
            imageUrl={product.cover_image?.path}
            className="min-h-96"
          />
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6366f1]">
              {getCategoryName(product.category)}
            </p>
            <h1 className="mt-3 text-4xl font-black text-[#1e1b4b]">
              {product.name}
            </h1>
            <p className="mt-4 text-3xl font-bold text-[#4338ca]">
              ${getPrice(product).toFixed(2)}
            </p>
            <p className="mt-6 leading-7 text-[#64748b]">
              {product.description}
            </p>
            <p className="mt-4 text-sm leading-6 text-[#94a3b8]">
              {product.stock > 0
                ? `${product.stock} item${product.stock === 1 ? "" : "s"} in stock.`
                : "Currently out of stock."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn flex-1 border-0 bg-[#4f46e5] text-white hover:bg-[#4338ca]"
              >
                <FaShoppingCart /> Add to cart
              </button>
              <button
                type="button"
                className="btn border-[#c7d2fe] bg-white text-[#4338ca] hover:bg-[#eef2ff]"
              >
                <FaHeart /> Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
