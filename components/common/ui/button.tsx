"use client";

import { FiLoader } from "react-icons/fi";

interface IProps {
  label: string;
  type?: "reset" | "submit" | "button";
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = ({
  label = "Button",
  type = "button",
  disabled = false,
  isLoading = false,
}: IProps) => {
  return (
    <button
      //   onClick={() => {}}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#4f46e5] text-sm font-bold text-white shadow-lg shadow-[#4f46e5]/25 transition hover:bg-[#4338ca] focus:outline-none focus:ring-4 focus:ring-[#4f46e5]/20 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#4f46e5]"
    >
      {isLoading && <FiLoader className="size-4 animate-spin" aria-hidden="true" />}
      {label}
    </button>
  );
};

export default Button;
