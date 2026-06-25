import CreateEntityForm from "@/components/admin/create-entity-form";
import PageTitle from "@/components/admin/page-title";
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
      <CreateEntityForm
        entityName="Brand"
        fields={[
          { label: "Brand name", name: "name", placeholder: "e.g. Northstar" },
          {
            label: "Website",
            name: "website",
            placeholder: "https://example.com",
            type: "url",
          },
          {
            label: "Description",
            name: "description",
            placeholder: "Write a short description of the brand...",
            multiline: true,
          },
          {
            label: "Brand image",
            name: "image",
            placeholder: "",
            image: true,
          },
        ]}
      />
    </main>
  );
};

export default CreateBrandPage;
