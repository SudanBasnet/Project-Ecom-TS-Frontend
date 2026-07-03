import { http, unwrapData } from "./http";
import type { Brand, Category, Product } from "./catalog.api";

type CreateBrandInput = {
  name: string;
  description?: string;
};

export const createBrand = async (data: CreateBrandInput) => {
  const response = await http.post("/brands", data);
  return unwrapData<Brand>(response);
};

export const updateBrand = async (id: string, data: CreateBrandInput) => {
  const response = await http.patch(`/brands/${id}`, data);
  return unwrapData<Brand>(response);
};

export const createCategory = async (data: FormData) => {
  const response = await http.post("/categories", data);
  return unwrapData<Category>(response);
};

export const createProduct = async (data: FormData) => {
  const response = await http.post("/products", data);
  return unwrapData<Product>(response);
};
