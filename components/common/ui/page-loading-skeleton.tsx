type PageLoadingSkeletonProps = Readonly<{
  variant?: "store" | "admin";
}>;

const PageLoadingSkeleton = ({
  variant = "store",
}: PageLoadingSkeletonProps) => {
  if (variant === "admin") {
    return (
      <div className="page-loading-skeleton space-y-6">
        <div className="h-24 rounded-2xl bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="h-32 rounded-2xl bg-slate-200" />
          <div className="h-32 rounded-2xl bg-slate-200" />
          <div className="h-32 rounded-2xl bg-slate-200" />
        </div>
        <div className="h-96 rounded-2xl bg-slate-200" />
      </div>
    );
  }

  return (
    <main className="page-loading-skeleton flex-1 px-6 py-14">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="h-80 rounded-[2rem] bg-indigo-100" />
          <div className="space-y-5 py-4">
            <div className="h-4 w-32 rounded bg-indigo-100" />
            <div className="h-12 w-3/4 rounded bg-indigo-100" />
            <div className="h-24 rounded bg-slate-200" />
            <div className="h-12 w-40 rounded bg-indigo-100" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-56 rounded-2xl bg-slate-200" />
          <div className="h-56 rounded-2xl bg-slate-200" />
          <div className="h-56 rounded-2xl bg-slate-200" />
        </div>
      </div>
    </main>
  );
};

export default PageLoadingSkeleton;
