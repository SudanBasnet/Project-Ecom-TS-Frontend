"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { TCategory } from "@/types/category.types";
import { Fade } from "react-awesome-reveal";
import CategoryCard from "./category-card";

interface IProps {
  categories: TCategory[];
}

const CategoryList = ({ categories }: IProps) => {
  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div ref={parent} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <Fade cascade damping={0.08} duration={350} triggerOnce>
        {categories.map((category, index) => (
          <CategoryCard
            category={category}
            key={category._id ?? `${category.name}-${index}`}
          />
        ))}
      </Fade>
    </div>
  );
};

export default CategoryList;
