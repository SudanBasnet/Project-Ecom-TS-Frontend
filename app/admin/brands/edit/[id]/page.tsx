import { getBrand } from "@/api/catalog.api";
import PageTitle from "@/components/admin/page-title";
import BrandForm from "@/components/forms/admin/brand.form";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Brand",
};

const EditBrandPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const brand = await getBrand(id).catch(() => null);

  if (!brand) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-[1600px] space-y-6">
      <PageTitle
        title={`Edit ${brand.name}`}
        description="Update this catalogue brand's public details."
        linkText="Go back"
        link="/admin/brands"
        backLink
      />
      <BrandForm
        brandId={brand._id}
        initialValues={{
          name: brand.name,
          description: brand.description ?? "",
        }}
      />
    </main>
  );
};

export default EditBrandPage;
