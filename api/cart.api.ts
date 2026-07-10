import type { Product } from "./catalog.api";
import { http, unwrapData } from "./http";

export type CartItem = {
  _id: string;
  product: Product;
  quantity: number;
};

export type Cart = {
  _id: string;
  user: string;
  items: CartItem[];
};

export const getCart = async () => {
  const response = await http.get("/cart");
  return unwrapData<Cart>(response);
};

export const addToCart = async ({
  productId,
  quantity = 1,
}: {
  productId: string;
  quantity?: number;
}) => {
  const response = await http.post(`/cart/${productId}`, { quantity });
  return unwrapData<Cart>(response);
};

export const updateCartItem = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  const response = await http.put(`/cart/${productId}`, { quantity });
  return unwrapData<Cart>(response);
};

export const removeCartItem = async (productId: string) => {
  const response = await http.delete(`/cart/${productId}`);
  return unwrapData<Cart>(response);
};

export const clearCart = async () => {
  const response = await http.delete("/cart");
  return unwrapData<Cart>(response);
};
