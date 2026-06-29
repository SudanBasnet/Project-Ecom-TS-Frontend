import * as yup from "yup";

export type TBrandFormValues = {
  name: string;
  description: string | undefined;
  logo: FileList | undefined;
};

const hasFiles = (value: unknown) => {
  if (!value) {
    return false;
  }

  if (typeof File !== "undefined" && value instanceof File) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === "object" && "length" in value) {
    return Number(value.length) > 0;
  }

  return false;
};

export const brandSchema: yup.ObjectSchema<TBrandFormValues> = yup.object({
  name: yup.string().trim().required("Brand name is required"),
  description: yup
    .string()
    .trim()
    .optional()
    .test(
      "description-length",
      "Description must be at least 25 characters",
      (value) => !value || value.length >= 25,
    ),
  logo: yup
    .mixed<FileList>()
    .test("logo-required", "Logo is required", hasFiles),
});

export type TBrandInput = yup.InferType<typeof brandSchema>;
