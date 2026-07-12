"use client";

import type { TCategory } from "@/types/category.types";
import { motion, useReducedMotion } from "framer-motion";
import { MdOutlineCloudOff } from "react-icons/md";
import CategoryCard from "./category-card";

interface IProps {
  categories: TCategory[];
}

const CategoryList = ({ categories }: IProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (categories.length === 0) {
    return (
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex min-h-32 flex-col items-center justify-center rounded-lg border border-dashed border-indigo-200 bg-white px-4 py-8 text-center"
      >
        <MdOutlineCloudOff className="size-10 text-indigo-500" />
        <p className="mt-2 text-lg font-medium text-gray-700">
          Categories not found
        </p>
        <p className="mt-1 text-sm text-gray-500">No categories added yet.</p>
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
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
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
        >
          <CategoryCard category={category} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryList;
