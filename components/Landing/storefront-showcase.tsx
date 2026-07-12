"use client";

import type { Article, Product } from "@/api/catalog.api";
import { getCategoryName, getPrice } from "@/api/catalog.api";
import ProductMedia from "@/components/common/ui/product-media";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const StorefrontShowcase = ({ products, articles }: { products: Product[]; articles: Article[] }) => {
  const reduce = useReducedMotion();
  const featured = products.filter((product) => product.featured).slice(0, 3);
  const favourites = featured.length === 3 ? featured : products.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-white px-6 py-20 dark:bg-slate-950">
        <div className="absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-600/10" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.55 }} className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"><FiStar /> Curated for you</span>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">Meet your new favourites.</h2>
              <p className="mt-3 max-w-xl leading-7 text-slate-500 dark:text-slate-400">Design-led essentials chosen for quality, usefulness, and the tiny details that make every day better.</p>
            </div>
            <Link href="/products" className="group inline-flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-300">Shop the collection <FiArrowUpRight className="transition group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={{ visible: { transition: { staggerChildren: reduce ? 0 : 0.12 } } }} className="mt-10 grid gap-6 lg:grid-cols-3">
            {favourites.map((product, index) => (
              <motion.article key={product._id} variants={reduce ? undefined : reveal} transition={{ duration: 0.55 }} whileHover={reduce ? undefined : { y: -8 }} className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-2xl hover:shadow-indigo-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-indigo-950/60">
                <Link href={`/products/${product._id}`}>
                  <div className="relative overflow-hidden">
                    <ProductMedia name={product.name} imageUrl={product.cover_image?.path} className="aspect-[4/3] transition duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-slate-900 shadow-sm backdrop-blur dark:bg-slate-950/85 dark:text-white">{index === 0 ? "BESTSELLER" : "NEW DROP"}</span>
                    <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:scale-110 hover:text-rose-500 dark:bg-slate-950/85 dark:text-slate-200"><FiHeart /></span>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-500">{getCategoryName(product.category)}</p>
                    <div className="mt-2 flex items-start justify-between gap-4"><h3 className="text-xl font-black text-slate-900 dark:text-white">{product.name}</h3><span className="text-lg font-black text-indigo-600 dark:text-indigo-300">${getPrice(product).toFixed(2)}</span></div>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{product.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white"><FiShoppingBag /> Explore product</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-100 px-6 py-20 dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ once: true }} variants={reveal} className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">The Broadway Journal</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-5xl dark:text-white">Read articles related to ecommerce.</h2>
            <p className="mt-4 leading-7 text-slate-500 dark:text-slate-400">Smart buying guides, considered living, and fresh ideas from the world of modern commerce.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={{ visible: { transition: { staggerChildren: reduce ? 0 : 0.12 } } }} className="mt-10 grid gap-6 lg:grid-cols-3">
            {articles.map((article) => (
              <motion.article key={article._id} variants={reduce ? undefined : reveal} whileHover={reduce ? undefined : { y: -7 }} className="group overflow-hidden rounded-[2rem] bg-white shadow-sm dark:bg-slate-950">
                <Link href={article.href}>
                  <div className="relative aspect-[16/10] overflow-hidden"><Image src={article.image.path} alt={article.title} fill unoptimized className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" /></div>
                  <div className="p-6"><div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300"><span>{article.category}</span><span className="text-slate-400">{article.read_time}</span></div><h3 className="mt-3 text-xl font-black leading-7 text-slate-900 dark:text-white">{article.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{article.excerpt}</p><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm dark:border-slate-800"><span className="font-semibold text-slate-500">By {article.author}</span><FiArrowUpRight className="size-5 text-indigo-600 transition group-hover:-translate-y-1 group-hover:translate-x-1" /></div></div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default StorefrontShowcase;
