import { getArticles, getProducts } from "@/api/catalog.api";
import CategorySection from "@/components/Landing/category-section";
import CategorySectionSkeleton from "@/components/Landing/category-section/skeleton";
import ExperiencePromises from "@/components/Landing/experience-promises";
import Hero from "@/components/Landing/hero";
import StorefrontShowcase from "@/components/Landing/storefront-showcase";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const [products, articles] = await Promise.all([
    getProducts().catch(() => []),
    getArticles().catch(() => []),
  ]);

  return (
    <main className="flex-1">
      <Hero products={products} />
      <Suspense fallback={<CategorySectionSkeleton />}>
        <CategorySection />
      </Suspense>

      <StorefrontShowcase products={products} articles={articles} />
      <ExperiencePromises />
    </main>
  );
};

export default HomePage;
