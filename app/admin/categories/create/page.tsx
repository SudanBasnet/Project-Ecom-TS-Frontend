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
            required: true,
          },
          {
            label: "Description",
            name: "description",
            placeholder: "Describe this category in at least 25 characters",
            multiline: true,
          },
          {
            label: "Category image",
            name: "image",
            placeholder: "",
            image: true,
            required: true,
          },
        ]}
      />
    </main>
  );
};

export default CreateCategoryPage;
