import { getBrands, getCategories } from "@/api/catalog.api";
import CreateEntityForm from "@/components/admin/create-entity-form";
import PageTitle from "@/components/admin/page-title";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Add Product",
};

const CreateProductPage = async () => {
  const [categories, brands] = await Promise.all([
    getCategories().catch(() => []),
    getBrands().catch(() => []),
  ]);

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
            required: true,
          },
          {
            label: "Category",
            name: "category",
            placeholder: "Choose a category",
            required: true,
            options: categories.map((category) => ({
              label: category.name,
              value: category._id,
            })),
          },
          {
            label: "Brand",
            name: "brand",
            placeholder: "Choose a brand",
            required: true,
            options: brands.map((brand) => ({
              label: brand.name,
              value: brand._id,
            })),
          },
          {
            label: "Price",
            name: "price",
            placeholder: "e.g. 79",
            type: "number",
            required: true,
          },
          {
            label: "Stock",
            name: "stock",
            placeholder: "e.g. 25",
            type: "number",
            required: true,
          },
          {
            label: "Description",
            name: "description",
            placeholder: "Describe this product in at least 25 characters",
            multiline: true,
          },
          {
            label: "Cover image",
            name: "cover_image",
            placeholder: "",
            image: true,
            required: true,
          },
          {
            label: "Gallery images",
            name: "images",
            placeholder: "",
            image: true,
            multiple: true,
          },
        ]}
      />
    </main>
  );
};

export default CreateProductPage;
