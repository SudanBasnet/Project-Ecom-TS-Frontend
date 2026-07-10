"use client";

import type { TCategory } from "@/types/category.types";
import { MdOutlineCloudOff } from "react-icons/md";
import CategoryCard from "./category-card";

interface IProps {
  categories: TCategory[];
}

const CategoryList = ({ categories }: IProps) => {
  if (categories.length === 0) {
    return (
      <div className="flex min-h-32 flex-col items-center justify-center rounded-lg border border-dashed border-indigo-200 bg-white px-4 py-8 text-center">
        <MdOutlineCloudOff className="size-10 text-indigo-500" />
        <p className="mt-2 text-lg font-medium text-gray-700">
          Categories not found
        </p>
        <p className="mt-1 text-sm text-gray-500">No categories added yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {categories.map((category, index) => (
        <CategoryCard
          category={category}
          key={category._id ?? `${category.name}-${index}`}
        />
      ))}
    </div>
  );
};

export default CategoryList;
