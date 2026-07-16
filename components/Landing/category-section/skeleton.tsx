const skeletonItems = Array.from({ length: 5 }, (_, index) => index);

const skeletonLayouts = [
  "lg:col-span-5",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-7",
  "lg:col-span-5",
];

const CategoryCardSkeleton = ({ index }: { index: number }) => (
  <div className={`relative h-full overflow-hidden rounded-[1.75rem] bg-slate-200 dark:bg-slate-800 ${skeletonLayouts[index]}`}>
    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 to-indigo-100 dark:from-slate-800 dark:to-slate-700" />
    <div className="absolute inset-x-0 bottom-0 p-6">
      <div className="h-3 w-24 animate-pulse rounded bg-white/60" />
      <div className="mt-3 h-7 w-1/2 animate-pulse rounded bg-white/70" />
      <div className="mt-3 h-3 w-3/4 animate-pulse rounded bg-white/50" />
    </div>
  </div>
);

const CategorySectionSkeleton = () => (
  <section className="min-h-60 bg-[#f6f7fb] px-6 py-24 dark:bg-slate-950">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="h-3 w-28 animate-pulse rounded bg-indigo-200 dark:bg-indigo-900" />
          <div className="mt-5 h-10 w-72 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="h-11 w-44 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="mt-12 grid auto-rows-[17rem] gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {skeletonItems.map((item) => (
          <CategoryCardSkeleton key={item} index={item} />
        ))}
      </div>
    </div>
  </section>
);

export default CategorySectionSkeleton;
