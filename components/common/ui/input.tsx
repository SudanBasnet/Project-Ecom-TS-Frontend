import React from "react";

interface IProps {
  label: string;
  id: string;
  type: "text" | "email" | "password" | "number";
  placeholder: string;
}

const Input = ({ id, label, placeholder, type }: IProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[#312e81]"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-[#c7d2fe] bg-[#f8f7ff] px-4 text-sm outline-none transition focus:border-[#4f46e5] focus:bg-white focus:ring-4 focus:ring-[#4f46e5]/10"
      />
    </div>
  );
};

export default Input;
