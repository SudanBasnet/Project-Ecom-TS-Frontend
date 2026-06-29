import PageTitle from "@/components/admin/page-title";
import BrandForm from "@/components/forms/admin/brand.form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Brand",
};

const CreateBrandPage = () => {
  return (
    <main className="mx-auto max-w-[1600px] space-y-6">
      <PageTitle
        title="Add new brand"
        description="Create a new catalogue brand for your products."
        linkText="Go back"
        link="/admin/brands"
        backLink
      />
      <BrandForm />
    </main>
  );
};

export default CreateBrandPage;
