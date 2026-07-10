const skeletonItems = Array.from({ length: 10 }, (_, index) => index);

const CategoryCardSkeleton = () => (
  <div className="flex h-24 gap-3 rounded-lg border border-indigo-100 bg-white p-2 shadow-sm">
    <div className="aspect-square h-full shrink-0 animate-pulse rounded-md bg-indigo-100" />
    <div className="flex min-w-0 flex-1 flex-col justify-center">
      <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-slate-200" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-slate-200" />
    </div>
  </div>
);

const CategorySectionSkeleton = () => (
  <section className="mt-10 min-h-60 bg-gray-50 px-6 py-8 sm:px-10 lg:px-20">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-4 w-48 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="h-5 w-24 animate-pulse rounded bg-indigo-100" />
    </div>

    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {skeletonItems.map((item) => (
        <CategoryCardSkeleton key={item} />
      ))}
    </div>
  </section>
);

export default CategorySectionSkeleton;
