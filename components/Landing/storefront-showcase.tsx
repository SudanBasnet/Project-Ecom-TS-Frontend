"use client";

import type { Article, Product } from "@/api/catalog.api";
import { getCategoryName, getPrice } from "@/api/catalog.api";
import ProductMedia from "@/components/common/ui/product-media";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBookOpen,
  FiBox,
  FiStar,
} from "react-icons/fi";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

type StorefrontShowcaseProps = {
  products: Product[];
  articles: Article[];
};

const ProductStory = ({
  product,
  lead = false,
}: {
  product: Product;
  lead?: boolean;
}) => (
  <Link href={`/products/${product._id}`} className="group block h-full">
    <article className="relative h-full min-h-80 overflow-hidden rounded-[2rem] bg-slate-900 shadow-[0_24px_70px_rgba(15,23,42,.16)]">
      <ProductMedia
        name={product.name}
        imageUrl={product.cover_image?.path}
        className={`h-full min-h-80 transition duration-700 group-hover:scale-105 ${lead ? "lg:min-h-[38rem]" : "lg:min-h-[18.5rem]"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.16em] text-slate-900 shadow-sm backdrop-blur">
          {lead ? "The standout" : product.new_arrival ? "New arrival" : "Editor’s pick"}
        </span>
        <span className="grid size-10 place-items-center rounded-full border border-white/20 bg-slate-950/30 text-white backdrop-blur transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white group-hover:text-slate-950">
          <FiArrowUpRight />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-200">
          {getCategoryName(product.category)}
        </p>
        <div className="mt-2 flex items-end justify-between gap-5">
          <div>
            <h3 className={`${lead ? "text-3xl sm:text-4xl" : "text-2xl"} font-black tracking-tight`}>
              {product.name}
            </h3>
            {lead && product.description && (
              <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">
                {product.description}
              </p>
            )}
          </div>
          <span className="shrink-0 text-lg font-black">
            ${getPrice(product).toFixed(2)}
          </span>
        </div>
      </div>
    </article>
  </Link>
);

const StorefrontShowcase = ({ products, articles }: StorefrontShowcaseProps) => {
  const reduce = useReducedMotion();
  const featured = products.filter((product) => product.featured);
  const favourites = [...featured, ...products.filter((product) => !product.featured)].slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-white px-6 py-24 dark:bg-slate-950">
        <div className="absolute left-1/2 top-12 size-[32rem] -translate-x-1/2 rounded-full bg-indigo-200/35 blur-[110px] dark:bg-indigo-600/10" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
            transition={{ duration: 0.55 }}
            className="flex flex-wrap items-end justify-between gap-6"
          >
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                <FiStar /> The Broadway edit
              </span>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl dark:text-white">
                A few things we can’t stop thinking about.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                Product-led stories selected from the live collection for their
                usefulness, design, and everyday staying power.
              </p>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-black text-indigo-600 dark:text-indigo-300"
            >
              Shop the full edit
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {favourites.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={{
                visible: {
                  transition: { staggerChildren: reduce ? 0 : 0.12 },
                },
              }}
              className="mt-12 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]"
            >
              <motion.div
                variants={reduce ? undefined : reveal}
                transition={{ duration: 0.6 }}
                whileHover={reduce ? undefined : { y: -6 }}
              >
                <ProductStory product={favourites[0]} lead />
              </motion.div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {favourites.slice(1).map((product) => (
                  <motion.div
                    key={product._id}
                    variants={reduce ? undefined : reveal}
                    transition={{ duration: 0.55 }}
                    whileHover={reduce ? undefined : { y: -6 }}
                  >
                    <ProductStory product={product} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-12 flex min-h-80 flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-indigo-200 bg-indigo-50/50 px-6 text-center dark:border-slate-700 dark:bg-slate-900/60"
            >
              <span className="grid size-16 place-items-center rounded-2xl bg-white text-indigo-600 shadow-lg shadow-indigo-100 dark:bg-slate-800 dark:text-indigo-300 dark:shadow-none">
                <FiBox className="size-7" />
              </span>
              <h3 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
                The next product edit is in progress.
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                Live products will take over this space as soon as the catalogue is available.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="overflow-hidden bg-indigo-600 px-6 py-8 text-white dark:bg-indigo-500">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center"
        >
          <p className="max-w-3xl text-2xl font-black tracking-tight sm:text-3xl">
            Less endless scrolling. More reasons to stop, look, and choose well.
          </p>
          <Link
            href="/products"
            className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-white px-5 py-3 text-sm font-black text-indigo-700 shadow-lg sm:self-auto"
          >
            See what’s new
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>

      <section
        id="journal"
        className="relative border-y border-slate-200 bg-slate-100 px-6 py-24 dark:border-slate-800 dark:bg-slate-900/70"
      >
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgba(99,102,241,.2)_1px,transparent_0)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
            className="flex flex-wrap items-end justify-between gap-6"
          >
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
                The Broadway Journal
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl dark:text-white">
                Good taste deserves a little context.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-500 dark:text-slate-400">
                Buying guides, considered living, and useful ideas from the world of modern commerce.
              </p>
            </div>
            <span className="hidden size-16 place-items-center rounded-full border border-indigo-200 bg-white text-indigo-600 shadow-sm sm:grid dark:border-slate-700 dark:bg-slate-950 dark:text-indigo-300">
              <FiBookOpen className="size-6" />
            </span>
          </motion.div>

          {articles.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={{
                visible: {
                  transition: { staggerChildren: reduce ? 0 : 0.12 },
                },
              }}
              className="mt-12 grid gap-5 lg:grid-cols-12"
            >
              {articles.slice(0, 3).map((article, index) => (
                <motion.article
                  key={article._id}
                  variants={reduce ? undefined : reveal}
                  whileHover={reduce ? undefined : { y: -7 }}
                  className={`group overflow-hidden rounded-[2rem] bg-white shadow-sm transition-shadow hover:shadow-2xl hover:shadow-indigo-200/40 dark:bg-slate-950 dark:hover:shadow-indigo-950/40 ${
                    index === 0 ? "lg:col-span-6" : "lg:col-span-3"
                  }`}
                >
                  <Link href={article.href} className="flex h-full flex-col">
                    <div className={`relative overflow-hidden ${index === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                      <Image
                        src={article.image.path}
                        alt={article.title}
                        fill
                        unoptimized
                        sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.14em] text-indigo-700 backdrop-blur">
                        {article.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                        <span>{article.read_time}</span>
                        <FiArrowUpRight className="size-5 text-indigo-600 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </div>
                      <h3 className={`${index === 0 ? "text-2xl sm:text-3xl" : "text-xl"} mt-4 font-black leading-tight text-slate-900 dark:text-white`}>
                        {article.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {article.excerpt}
                      </p>
                      <p className="mt-auto border-t border-slate-100 pt-5 text-sm font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
                        By {article.author}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 flex min-h-72 flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-slate-300 bg-white/70 px-6 text-center backdrop-blur dark:border-slate-700 dark:bg-slate-950/70"
            >
              <FiBookOpen className="size-10 text-indigo-500" />
              <h3 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
                The next story is being written.
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                Journal entries will appear here when they are published by the live article service.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default StorefrontShowcase;
