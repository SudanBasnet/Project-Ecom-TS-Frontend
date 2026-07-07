"use client";

import Image from "next/image";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { LuAsterisk, LuImageUp } from "react-icons/lu";

interface IProps {
  name?: string;
  multiple?: boolean;
  required?: boolean;
  label: string;
  id: string;
  error?: string;
  register?: UseFormRegisterReturn;
}

const ImageInput = ({
  name,
  multiple = false,
  label,
  required = false,
  id,
  error,
  register,
}: IProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    void register?.onChange(event);

    const file = event.target.files?.[0];
    setPreview((currentPreview) => {
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview);
      }

      return file ? URL.createObjectURL(file) : null;
    });
  };

  const handleRemovePreview = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setPreview((currentPreview) => {
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview);
      }

      return null;
    });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
        {required && <LuAsterisk className="size-3 text-indigo-600" />}
      </div>

      <label
        htmlFor={id}
        className={`flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-slate-50 px-4 py-5 text-center transition hover:border-indigo-400 hover:bg-indigo-50 ${
          error ? "border-red-300" : "border-indigo-200"
        }`}
      >
        {preview ? (
          <span className="group relative mb-3 block size-24 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <Image
              src={preview}
              alt={`${label} preview`}
              fill
              sizes="96px"
              className="object-cover"
              unoptimized
            />
            <button
              type="button"
              onClick={handleRemovePreview}
              aria-label={`Remove ${label} preview`}
              className="absolute right-1 top-1 hidden cursor-pointer rounded-full bg-white p-1 text-red-500 shadow-sm group-hover:block"
            >
              <IoClose />
            </button>
          </span>
        ) : (
          <LuImageUp className="mb-2 size-7 text-indigo-600" />
        )}
        <span className="text-sm font-semibold text-slate-700">
          Click to upload {multiple ? "images" : "an image"}
        </span>
        <span className="mt-1 text-xs text-slate-500">
          {multiple ? "Multiple files allowed" : "Only one file allowed"} - PNG,
          JPG or WEBP
        </span>
        <input
          {...register}
          ref={(element) => {
            inputRef.current = element;
            register?.ref(element);
          }}
          id={id}
          name={register?.name ?? name ?? id}
          type="file"
          accept="image/*"
          className="sr-only"
          multiple={multiple}
          required={required}
          onChange={handleChange}
        />
      </label>
      <p className="h-3 text-xs text-red-500">{error}</p>
    </div>
  );
};

export default ImageInput;
