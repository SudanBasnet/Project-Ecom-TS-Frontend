import { getCategories } from "@/api/catalog.api";
import { FaChevronDown } from "react-icons/fa6";
import CategoryList from "./list";
import CategorySectionMotion from "./section-motion";

const CategorySection = async () => {
  const categories = await getCategories().catch(() => []);

  return (
    <section className="mt-10 min-h-60 bg-gray-50 px-6 py-8 transition-colors sm:px-10 lg:px-20 dark:bg-slate-900">
      <CategorySectionMotion>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-wider text-gray-700 dark:text-white">
              All Categories
            </h2>
            <p className="text-sm font-normal text-gray-500 dark:text-slate-400">
              Explore our featured categories
            </p>
          </div>
          <div className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#4338ca]">
            <span>Explore All</span>
            <FaChevronDown />
          </div>
        </div>

        <div className="mt-4">
          <CategoryList categories={categories} />
        </div>
      </CategorySectionMotion>
    </section>
  );
};

export default CategorySection;
