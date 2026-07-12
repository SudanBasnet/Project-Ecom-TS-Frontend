import { http, unwrapData } from "./http";

type ImageAsset = {
  path: string;
  public_id: string;
};

export type Category = {
  _id: string;
  name: string;
  description?: string;
  image?: ImageAsset | ImageAsset[];
  createdAt?: string;
  updatedAt?: string;
};

export type Brand = {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Product = {
  _id: string;
  name: string;
  description?: string;
  price: string | number;
  stock: number;
  cover_image?: ImageAsset;
  image?: ImageAsset[];
  category?: string | Category;
  brand?: string | Brand;
  new_arrival?: boolean;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Article = {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  read_time: string;
  image: ImageAsset;
  href: string;
  featured?: boolean;
};

export const getProducts = async () => {
  const response = await http.get("/products", { params: { limit: 100 } });
  return unwrapData<Product[]>(response);
};

export const getProduct = async (id: string) => {
  const response = await http.get(`/products/${id}`);
  return unwrapData<Product>(response);
};

export const getBrands = async () => {
  const response = await http.get("/brands");
  return unwrapData<Brand[]>(response);
};

export const getBrand = async (id: string) => {
  const response = await http.get(`/brands/${id}`);
  return unwrapData<Brand>(response);
};

export const getCategories = async () => {
  const response = await http.get("/categories");
  return unwrapData<Category[]>(response);
};

export const getArticles = async () => {
  const response = await http.get("/articles");
  return unwrapData<Article[]>(response);
};

export const getCategory = async (id: string) => {
  const response = await http.get(`/categories/${id}`);
  return unwrapData<Category>(response);
};

export const getCategoryName = (category: Product["category"]) =>
  typeof category === "object" && category ? category.name : "Uncategorised";

export const getBrandName = (brand: Product["brand"]) =>
  typeof brand === "object" && brand ? brand.name : "No brand";

export const getPrice = (product: Product) => Number(product.price) || 0;
