import { getCategories } from "@/api/catalog.api";
import type { TCategory } from "@/types/category.types";
import { FaChevronDown } from "react-icons/fa6";
import CategoryList from "./list";

const fallbackCategories: TCategory[] = Array.from({ length: 10 }, (_, index) => ({
  _id: `sample-${index + 1}`,
  name: `Category ${index + 1}`,
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum repellendus cumque perspiciatis reprehenderit tempore eos.",
  image: {
    _id: `sample-image-${index + 1}`,
    public_id: `sample-image-${index + 1}`,
    path: "/window.svg",
  },
}));

const CategorySection = async () => {
  const categories = await getCategories().catch(() => []);
  const visibleCategories = categories.length > 0 ? categories.slice(0, 10) : fallbackCategories;

  return (
    <section className="mt-10 min-h-60 bg-gray-50 px-6 py-8 sm:px-10 lg:px-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-wider text-gray-700">
            All Categories
          </h2>
          <p className="text-sm font-normal text-gray-500">
            Explore our featured categories
          </p>
        </div>
        <div className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#4338ca]">
          <span>Explore All</span>
          <FaChevronDown />
        </div>
      </div>

      <div className="mt-4">
        <CategoryList categories={visibleCategories} />
      </div>
    </section>
  );
};

export default CategorySection;
