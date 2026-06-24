import CreateEntityForm from "@/components/admin/create-entity-form";
import PageTitle from "@/components/admin/page-title";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Category",
};

const CreateCategoryPage = () => {
  return (
    <main className="mx-auto max-w-[1600px] space-y-6">
      <PageTitle
        title="Add new category"
        description="Create a category to organise related catalogue products."
        linkText="Go back"
        link="/admin/categories"
        backLink
      />
      <CreateEntityForm
        entityName="Category"
        fields={[
          {
            label: "Category name",
            name: "name",
            placeholder: "e.g. Electronics",
          },
          {
            label: "Display order",
            name: "order",
            placeholder: "e.g. 1",
            type: "number",
          },
        ]}
      />
    </main>
  );
};

export default CreateCategoryPage;
