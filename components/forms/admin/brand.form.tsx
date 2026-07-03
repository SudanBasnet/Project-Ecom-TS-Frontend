"use client";

import { createBrand, updateBrand } from "@/api/admin.api";
import AdminListCard from "@/components/admin/list-card";
import Button from "@/components/common/ui/button";
import Input from "@/components/common/ui/input";
import {
  brandSchema,
  TBrandFormValues,
  TBrandInput,
} from "@/schema/brand.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type BrandFormProps = Readonly<{
  brandId?: string;
  initialValues?: TBrandFormValues;
}>;

const BrandForm = ({ brandId, initialValues }: BrandFormProps) => {
  const isEditing = Boolean(brandId);
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm<TBrandFormValues, unknown, TBrandInput>({
    mode: "onChange",
    defaultValues: initialValues ?? {
      name: "",
      description: "",
    },
    resolver: yupResolver(brandSchema),
  });
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: TBrandInput) =>
      brandId ? updateBrand(brandId, data) : createBrand(data),
  });

  const onSubmit = (data: TBrandInput) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(isEditing ? "Brand updated" : "Brand created");
        router.push("/admin/brands");
        router.refresh();
      },
      onError: () => {
        toast.error(
          isEditing ? "Unable to update brand" : "Unable to create brand",
        );
      },
    });
  };

  return (
    <AdminListCard>
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">
          {isEditing ? "Edit brand details" : "Brand details"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {isEditing
            ? "Update this catalogue brand for your products."
            : "Create a new catalogue brand for your products."}
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
          <Button
            label={
              isPending
                ? "Saving..."
                : isEditing
                  ? "Update brand"
                  : "Save brand"
            }
            type="submit"
            disabled={isPending}
          />
        </div>
      </form>
    </AdminListCard>
  );
};

export default BrandForm;
