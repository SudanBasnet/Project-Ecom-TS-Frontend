export default function ProductLoading() {
  return (
    <main className="flex-1 animate-pulse px-6 py-14">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-white lg:grid-cols-2">
        <div className="min-h-96 bg-[#c7d2fe]" />
        <div className="space-y-5 p-12">
          <div className="h-4 w-24 rounded bg-[#e0e7ff]" />
          <div className="h-10 w-3/4 rounded bg-[#e0e7ff]" />
          <div className="h-8 w-28 rounded bg-[#e0e7ff]" />
          <div className="h-24 rounded bg-[#f1f5f9]" />
        </div>
      </div>
    </main>
  );
}
