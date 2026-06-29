"use client";

import AdminListCard from "@/components/admin/list-card";
import Button from "@/components/common/ui/button";
import ImageInput from "@/components/common/ui/image-input";
import Input from "@/components/common/ui/input";
import {
  brandSchema,
  TBrandFormValues,
  TBrandInput,
} from "@/schema/brand.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const BrandForm = () => {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm<TBrandFormValues, unknown, TBrandInput>({
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      logo: undefined,
    },
    resolver: yupResolver(brandSchema),
  });

  const onSubmit = (data: TBrandInput) => {
    console.log("brand data", data);
  };

  return (
    <AdminListCard>
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Brand details</h2>
        <p className="mt-1 text-sm text-slate-500">
          Create a new catalogue brand for your products.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-6 flex max-w-3xl flex-col gap-5"
      >
        <Input
          label="Brand name"
          name="name"
          id="name"
          type="text"
          error={errors.name?.message}
          isValid={dirtyFields.name && !errors.name}
          placeholder="e.g. Northstar"
          register={register}
          required
        />

        <ImageInput
          label="Logo"
          id="logo"
          error={errors.logo?.message}
          register={register("logo")}
          required
        />

        <Input
          label="Description"
          name="description"
          id="description"
          multiline
          error={errors.description?.message}
          isValid={dirtyFields.description && !errors.description}
          type="text"
          placeholder="Describe your brand in at least 25 characters"
          register={register}
        />

        <div className="max-w-48">
          <Button label="Save brand" type="submit" />
        </div>
      </form>
    </AdminListCard>
  );
};

export default BrandForm;
