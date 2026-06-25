import React from "react";
import { LuAsterisk, LuImageUp } from "react-icons/lu";

interface IProps {
  multiple?: boolean;
  required?: boolean;
  label: string;
  id: string;
}

const ImageInput = ({
  multiple = false,
  label,
  required = false,
  id,
}: IProps) => {
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
        className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-indigo-200 bg-slate-50 px-4 py-5 text-center transition hover:border-indigo-400 hover:bg-indigo-50"
      >
        <LuImageUp className="mb-2 size-7 text-indigo-600" />
        <span className="text-sm font-semibold text-slate-700">
          Click to upload {multiple ? "images" : "an image"}
        </span>
        <span className="mt-1 text-xs text-slate-500">
          PNG, JPG, WEBP or SVG
        </span>
        <input
          id={id}
          name={id}
          type="file"
          accept="image/*"
          className="sr-only"
          multiple={multiple}
          required={required}
        />
      </label>
    </div>
  );
};

export default ImageInput;
