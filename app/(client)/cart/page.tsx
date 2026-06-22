import ProductVisual from "@/components/common/ui/product-visual";
import { products } from "@/data/products";
import type { Metadata } from "next";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Cart",
};

const CartPage = () => {
  const cartProduct = products[0];

  return (
    <main className="flex-1 px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <div className="grid size-12 place-items-center rounded-2xl bg-[#eef2ff] text-[#4f46e5]">
            <FaShoppingCart />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#1e1b4b]">Shopping cart</h1>
            <p className="mt-1 text-[#64748b]">
              A reusable placeholder for cart state and checkout totals.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_22rem]">
          <article className="flex flex-col overflow-hidden rounded-3xl border border-[#e0e7ff] bg-white sm:flex-row">
            <ProductVisual
              name={cartProduct.name}
              accent={cartProduct.accent}
              className="min-h-56 sm:w-56"
            />
            <div className="flex flex-1 flex-col justify-center p-6">
              <p className="text-sm font-semibold text-[#6366f1]">
                {cartProduct.category}
              </p>
              <h2 className="mt-1 text-xl font-bold text-[#1e1b4b]">
                {cartProduct.name}
              </h2>
              <p className="mt-2 text-sm text-[#64748b]">Quantity: 1</p>
              <p className="mt-4 text-xl font-bold text-[#4338ca]">
                ${cartProduct.price}
              </p>
            </div>
          </article>

          <aside className="rounded-3xl bg-[#eef2ff] p-6">
            <h2 className="text-xl font-bold text-[#1e1b4b]">Order summary</h2>
            <div className="mt-6 space-y-3 text-sm text-[#64748b]">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartProduct.price}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping</span>
                <span>$0</span>
              </p>
              <p className="flex justify-between border-t border-[#c7d2fe] pt-4 text-base font-bold text-[#1e1b4b]">
                <span>Total</span>
                <span>${cartProduct.price}</span>
              </p>
            </div>
            <button
              type="button"
              className="btn mt-6 w-full border-0 bg-[#4f46e5] text-white hover:bg-[#4338ca]"
            >
              Checkout
            </button>
            <Link
              href="/products"
              className="mt-4 block text-center text-sm font-semibold text-[#4338ca] hover:underline"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
