import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FaAsterisk } from "react-icons/fa";

interface IProps {
  name: string;
  label: string;
  id: string;
  type: "text" | "email" | "password" | "number";
  placeholder: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  isValid?: boolean;
}

const Input = ({
  id,
  label,
  placeholder,
  required = false,
  type,
  name,
  register,
  error,
  isValid = false,
}: IProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-[#312e81]"
      >
        {label}
        {required && !isValid && (
          <FaAsterisk className="size-2 text-[#ef4444]" />
        )}
      </label>
      <input
        {...register(name)}
        id={id}
        required={required}
        type={type}
        placeholder={placeholder}
        className={`h-12 w-full rounded-xl border border-[#c7d2fe] bg-[#f8f7ff] px-4 text-sm outline-none transition ${error ? "focus:border-[#ff0000] focus:bg-white focus:ring-4 focus:ring-[#ff0000]/10" : "focus:border-[#4f46e5] focus:bg-white focus:ring-4 focus:ring-[#4f46e5]/10"}`}
      />
      <p className="h-3 text-red-500 text-xs -mt-0.5">{error}</p>
    </div>
  );
};

export default Input;
