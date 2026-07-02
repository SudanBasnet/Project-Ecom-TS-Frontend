import * as yup from "yup";

export type TBrandFormValues = {
  name: string;
  description: string | undefined;
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
});

export type TBrandInput = yup.InferType<typeof brandSchema>;
