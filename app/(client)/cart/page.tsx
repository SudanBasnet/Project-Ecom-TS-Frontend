"use client";

import {
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
  type Cart,
} from "@/api/cart.api";
import { getPrice } from "@/api/catalog.api";
import ProductMedia from "@/components/common/ui/product-media";
import PageLoadingSkeleton from "@/components/common/ui/page-loading-skeleton";
import withAuth from "@/hoc/withAuth.hoc";
import { Role } from "@/types/enum.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error) && typeof error.response?.data?.message === "string") {
    return error.response.data.message;
  }
  return "Unable to update your cart";
};

const CartPage = () => {
  const queryClient = useQueryClient();
  const cartQuery = useQuery({ queryKey: ["cart"], queryFn: getCart });
  const syncCart = (cart: Cart) => queryClient.setQueryData(["cart"], cart);

  const quantityMutation = useMutation({
    mutationFn: updateCartItem,
    onSuccess: syncCart,
    onError: (error) => toast.error(getErrorMessage(error)),
  });
  const removeMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: (cart) => {
      syncCart(cart);
      toast.success("Product removed from cart");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
  const clearMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: (cart) => {
      syncCart(cart);
      toast.success("Cart cleared");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  if (cartQuery.isLoading) return <PageLoadingSkeleton />;

  if (cartQuery.isError) {
    return (
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-rose-200 bg-white p-10 text-center">
          <h1 className="text-2xl font-black text-[#1e1b4b]">Unable to load your cart</h1>
          <p className="mt-3 text-sm text-slate-500">{getErrorMessage(cartQuery.error)}</p>
          <button
            type="button"
            onClick={() => void cartQuery.refetch()}
            className="mt-6 rounded-xl bg-[#4f46e5] px-5 py-3 text-sm font-bold text-white"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  const items = cartQuery.data?.items ?? [];
  const subtotal = items.reduce(
    (total, item) => total + getPrice(item.product) * item.quantity,
    0,
  );
  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  return (
    <main className="flex-1 px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6366f1]">Your bag</p>
            <h1 className="mt-2 text-4xl font-black text-[#1e1b4b]">Shopping cart</h1>
            <p className="mt-2 text-sm text-slate-500">
              {items.length} product{items.length === 1 ? "" : "s"} in your cart
            </p>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              disabled={clearMutation.isPending}
              onClick={() => clearMutation.mutate()}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-rose-600 transition hover:bg-rose-50 disabled:opacity-60"
            >
              <FiTrash2 /> {clearMutation.isPending ? "Clearing..." : "Clear cart"}
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#eef2ff] text-[#4f46e5]">
              <FiShoppingBag className="size-7" />
            </span>
            <h2 className="mt-5 text-2xl font-black text-[#1e1b4b]">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-500">Discover something you like and add it to your bag.</p>
            <Link href="/products" className="mt-6 inline-flex rounded-xl bg-[#4f46e5] px-6 py-3 text-sm font-bold text-white hover:bg-[#4338ca]">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <section className="space-y-4">
              {items.map(({ product, quantity, _id }) => {
                const isUpdating =
                  quantityMutation.isPending &&
                  quantityMutation.variables?.productId === product._id;
                const isRemoving =
                  removeMutation.isPending && removeMutation.variables === product._id;

                return (
                  <article key={_id} className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[9rem_1fr] sm:p-5">
                    <ProductMedia name={product.name} imageUrl={product.cover_image?.path} className="aspect-square rounded-2xl" />
                    <div className="flex min-w-0 flex-col justify-between gap-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link href={`/products/${product._id}`} className="text-xl font-black text-[#1e1b4b] hover:text-[#4f46e5]">{product.name}</Link>
                          <p className="mt-1 text-sm text-slate-500">{product.stock} available</p>
                        </div>
                        <p className="shrink-0 text-lg font-black text-[#4338ca]">${(getPrice(product) * quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                          <button type="button" aria-label={`Decrease ${product.name} quantity`} disabled={quantity <= 1 || isUpdating} onClick={() => quantityMutation.mutate({ productId: product._id, quantity: quantity - 1 })} className="grid size-9 place-items-center rounded-lg text-slate-600 hover:bg-white disabled:opacity-35"><FiMinus /></button>
                          <span className="w-10 text-center text-sm font-black text-[#1e1b4b]">{isUpdating ? "…" : quantity}</span>
                          <button type="button" aria-label={`Increase ${product.name} quantity`} disabled={quantity >= product.stock || isUpdating} onClick={() => quantityMutation.mutate({ productId: product._id, quantity: quantity + 1 })} className="grid size-9 place-items-center rounded-lg text-slate-600 hover:bg-white disabled:opacity-35"><FiPlus /></button>
                        </div>
                        <button type="button" disabled={isRemoving} onClick={() => removeMutation.mutate(product._id)} className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700 disabled:opacity-50"><FiTrash2 /> {isRemoving ? "Removing..." : "Remove"}</button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            <aside className="h-fit rounded-3xl border border-[#e0e7ff] bg-white p-6 shadow-xl shadow-indigo-100 lg:sticky lg:top-24">
              <h2 className="text-xl font-black text-[#1e1b4b]">Order summary</h2>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between text-slate-600"><span>Subtotal</span><span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-slate-600"><span>Shipping</span><span className="font-bold text-slate-900">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-end justify-between"><span className="font-bold text-[#1e1b4b]">Total</span><span className="text-2xl font-black text-[#4338ca]">${total.toFixed(2)}</span></div>
                  <p className="mt-2 text-xs text-slate-400">Taxes calculated at checkout.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toast.info("Checkout will be available when the order API is connected")}
                className="mt-6 w-full rounded-xl bg-[#4f46e5] px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-indigo-200 hover:bg-[#4338ca]"
              >
                Proceed to checkout
              </button>
              {subtotal < 100 && <p className="mt-3 text-center text-xs text-slate-500">Add ${(100 - subtotal).toFixed(2)} more for free shipping.</p>}
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default withAuth(CartPage, [Role.USER]);
