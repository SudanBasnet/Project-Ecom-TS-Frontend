import CreateEntityForm from "@/components/admin/create-entity-form";
import PageTitle from "@/components/admin/page-title";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product",
};

const CreateProductPage = () => {
  return (
    <main className="mx-auto max-w-[1600px] space-y-6">
      <PageTitle
        title="Add new product"
        description="Enter the essential details for a new catalogue item."
        linkText="Go back"
        link="/admin/products"
        backLink
      />
      <CreateEntityForm
        entityName="Product"
        fields={[
          {
            label: "Product name",
            name: "name",
            placeholder: "e.g. Everyday Backpack",
          },
          {
            label: "Category",
            name: "category",
            placeholder: "e.g. Bags",
          },
          {
            label: "Price",
            name: "price",
            placeholder: "e.g. 79",
            type: "number",
          },
          {
            label: "Product URL slug",
            name: "slug",
            placeholder: "e.g. everyday-backpack",
          },
        ]}
      />
    </main>
  );
};

export default CreateProductPage;
