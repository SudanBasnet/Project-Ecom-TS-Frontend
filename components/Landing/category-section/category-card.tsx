"use client";

import type { TCategory } from "@/types/category.types";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiGrid } from "react-icons/fi";
import Tilt from "react-parallax-tilt";

interface IProps {
  category: TCategory;
  index: number;
}

const getCategoryImage = (category: TCategory) => {
  const image = Array.isArray(category.image)
    ? category.image[0]
    : category.image;
  return image?.path;
};

const CategoryCard = ({ category, index }: IProps) => {
  const shouldReduceMotion = useReducedMotion();
  const imagePath = getCategoryImage(category);
  const imageSrc =
    imagePath?.startsWith("/") || imagePath?.startsWith("https://")
      ? imagePath
      : null;

  return (
    <Tilt
      glareEnable={!shouldReduceMotion}
      glareMaxOpacity={0.09}
      glareColor="#ffffff"
      glareBorderRadius="28px"
      scale={1.01}
      tiltMaxAngleX={3}
      tiltMaxAngleY={3}
      transitionSpeed={1200}
      tiltEnable={!shouldReduceMotion}
      className="h-full"
    >
      <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/70 bg-slate-900 shadow-[0_18px_50px_rgba(15,23,42,.10)] transition-shadow hover:shadow-[0_28px_70px_rgba(79,70,229,.22)] dark:border-slate-700 dark:bg-slate-900">
        <div className="absolute inset-0 grid place-items-center overflow-hidden bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 text-white">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={category.name}
              fill
              sizes="(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <FiGrid className="size-14 opacity-80" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 text-white">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-indigo-200">
              Collection {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 truncate text-2xl font-black tracking-tight">
              {category.name}
            </h3>
            <p className="mt-2 line-clamp-2 max-w-md text-sm leading-6 text-slate-200">
              {category.description ?? "Discover products selected for this collection."}
            </p>
          </div>
          <Link
            href="/products"
            aria-label={`Browse ${category.name} products`}
            className="grid size-12 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white group-hover:text-slate-950"
          >
            <FiArrowUpRight className="size-5" />
          </Link>
        </div>
      </article>
    </Tilt>
  );
};

export default CategoryCard;
