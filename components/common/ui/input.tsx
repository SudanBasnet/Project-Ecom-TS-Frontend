import React from "react";
import { FaAsterisk } from "react-icons/fa";

interface IProps {
  label: string;
  id: string;
  type: "text" | "email" | "password" | "number";
  placeholder: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  id,
  label,
  placeholder,
  required = false,
  type,
  onChange,
}: IProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-[#312e81]"
      >
        {label}
        {required && (
          <FaAsterisk aria-hidden="true" className="size-2 text-[#ef4444]" />
        )}
      </label>
      <input
        onChange={onChange}
        id={id}
        name={id}
        required={required}
        type={type}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-[#c7d2fe] bg-[#f8f7ff] px-4 text-sm outline-none transition focus:border-[#4f46e5] focus:bg-white focus:ring-4 focus:ring-[#4f46e5]/10"
      />
    </div>
  );
};

export default Input;
