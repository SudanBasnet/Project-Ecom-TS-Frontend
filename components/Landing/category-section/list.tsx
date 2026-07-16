"use client";

import type { TCategory } from "@/types/category.types";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight, FiGrid } from "react-icons/fi";
import CategoryCard from "./category-card";

interface IProps {
  categories: TCategory[];
}

const CategoryList = ({ categories }: IProps) => {
  const shouldReduceMotion = useReducedMotion();
  const cardLayouts = [
    "lg:col-span-5",
    "lg:col-span-3",
    "lg:col-span-4",
    "lg:col-span-7",
    "lg:col-span-5",
  ];

  if (categories.length === 0) {
    return (
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex min-h-72 flex-col items-center justify-center rounded-[2rem] border border-dashed border-indigo-200 bg-white/80 px-6 py-10 text-center shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70"
      >
        <span className="grid size-16 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
          <FiGrid className="size-7" />
        </span>
        <p className="mt-5 text-xl font-black text-slate-900 dark:text-white">
          The collections are being arranged.
        </p>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Categories will appear here as soon as they are available from the live catalogue.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 text-sm font-black text-indigo-600 dark:text-indigo-300"
        >
          Browse all products <FiArrowUpRight />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: shouldReduceMotion
            ? { staggerChildren: 0 }
            : { staggerChildren: 0.08, delayChildren: 0.08 },
        },
      }}
      className="grid auto-rows-[17rem] gap-4 sm:grid-cols-2 lg:grid-cols-12"
    >
      {categories.map((category, index) => (
        <motion.div
          key={category._id ?? `${category.name}-${index}`}
          variants={{
            hidden: shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 20, scale: 0.97 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          className={`min-h-0 ${cardLayouts[index % cardLayouts.length]}`}
        >
          <CategoryCard category={category} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryList;
