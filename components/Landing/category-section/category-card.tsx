"use client";

import type { TCategory } from "@/types/category.types";
import Image from "next/image";
import { FaShoppingBag } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

interface IProps {
  category: TCategory;
}

const getCategoryImage = (category: TCategory) => {
  const image = Array.isArray(category.image) ? category.image[0] : category.image;
  return image?.path;
};

const CategoryCard = ({ category }: IProps) => {
  const imagePath = getCategoryImage(category);
  const imageSrc = imagePath?.startsWith("/") ? imagePath : null;

  return (
    <Tilt
      glareEnable
      glareMaxOpacity={0.12}
      glareColor="#ffffff"
      glareBorderRadius="8px"
      scale={1.015}
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      transitionSpeed={1200}
    >
      <article className="flex h-24 gap-3 rounded-lg border border-indigo-100 bg-white p-2 shadow-sm transition-shadow hover:shadow-lg hover:shadow-indigo-100">
        <div className="relative grid aspect-square h-full shrink-0 place-items-center overflow-hidden rounded-md bg-[#eef2ff] text-[#4f46e5]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={category.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <FaShoppingBag className="size-6" />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-gray-700">
            {category.name}
          </p>
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-gray-400">
            {category.description ?? "Explore products in this category."}
          </p>
        </div>
      </article>
    </Tilt>
  );
};

export default CategoryCard;
