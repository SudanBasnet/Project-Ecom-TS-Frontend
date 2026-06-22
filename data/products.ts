export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  accent: string;
};

export const products: Product[] = [
  {
    id: "everyday-backpack",
    name: "Everyday Backpack",
    category: "Bags",
    description:
      "A lightweight backpack with room for work, study, and weekend essentials.",
    price: 79,
    accent: "from-indigo-500 to-violet-400",
  },
  {
    id: "cloud-sneakers",
    name: "Cloud Sneakers",
    category: "Footwear",
    description:
      "Comfortable everyday sneakers with soft cushioning and a clean silhouette.",
    price: 96,
    accent: "from-sky-500 to-cyan-300",
  },
  {
    id: "classic-watch",
    name: "Classic Watch",
    category: "Accessories",
    description:
      "A minimal watch designed to work equally well with casual and formal outfits.",
    price: 125,
    accent: "from-slate-700 to-slate-400",
  },
  {
    id: "linen-shirt",
    name: "Linen Shirt",
    category: "Clothing",
    description:
      "A breathable button-up shirt for warm days, relaxed offices, and easy layering.",
    price: 54,
    accent: "from-amber-400 to-orange-300",
  },
  {
    id: "studio-headphones",
    name: "Studio Headphones",
    category: "Electronics",
    description:
      "Wireless over-ear headphones with balanced sound and all-day comfort.",
    price: 149,
    accent: "from-fuchsia-500 to-pink-400",
  },
  {
    id: "ceramic-mug",
    name: "Ceramic Mug",
    category: "Home",
    description:
      "A sturdy handmade-style mug for coffee, tea, and slow morning rituals.",
    price: 24,
    accent: "from-emerald-500 to-teal-300",
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
