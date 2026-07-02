"use client";

import { createCategory, createProduct } from "@/api/admin.api";
import AdminListCard from "./list-card";
import ImageInput from "@/components/common/ui/image-input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

type Field = {
  label: string;
  name: string;
  placeholder: string;
  type?: "text" | "number" | "url";
  multiline?: boolean;
  image?: boolean;
  multiple?: boolean;
  required?: boolean;
  options?: { label: string; value: string }[];
};

type CreateEntityFormProps = {
  entityName: string;
  fields: Field[];
};

const CreateEntityForm = ({
  entityName,
  fields,
}: CreateEntityFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setIsSubmitting(true);

      if (entityName.toLowerCase() === "category") {
        await createCategory(formData);
        toast.success("Category created");
        router.push("/admin/categories");
        router.refresh();
        return;
      }

      if (entityName.toLowerCase() === "product") {
        await createProduct(formData);
        toast.success("Product created");
        router.push("/admin/products");
        router.refresh();
        return;
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : `Unable to save ${entityName}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminListCard>
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">
          {entityName} details
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Enter the information below and save it to the backend.
        </p>
      </div>

      <form
        className="mt-6 grid max-w-3xl gap-5 sm:grid-cols-2"
        onSubmit={handleSubmit}
      >
        {fields.map((field) =>
          field.image ? (
            <div key={field.name} className="sm:col-span-2">
              <ImageInput
                label={field.label}
                id={field.name}
                multiple={field.multiple}
                required={field.required}
              />
            </div>
          ) : (
            <label
              key={field.name}
              className={`grid gap-2 ${
                field.multiline ? "sm:col-span-2" : ""
              }`}
            >
              <span className="text-sm font-semibold text-slate-700">
                {field.label}
              </span>
              {field.options ? (
                <select
                  name={field.name}
                  required={field.required}
                  defaultValue=""
                  className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                >
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.multiline ? (
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={5}
                  className="min-h-32 resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              ) : (
                <input
                  type={field.type ?? "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              )}
            </label>
          ),
        )}

        <div className="flex gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            {isSubmitting ? "Saving..." : `Save ${entityName.toLowerCase()}`}
          </button>
          <button
            type="reset"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Clear
          </button>
        </div>
      </form>
    </AdminListCard>
  );
};

export default CreateEntityForm;
