"use client";

interface IProps {
  label: string;
  type?: "reset" | "submit" | "button";
  disabled?: boolean;
}

const Button = ({
  label = "Button",
  type = "button",
  disabled = false,
}: IProps) => {
  return (
    <button
      //   onClick={() => {}}
      type={type}
      disabled={disabled}
      className="h-12 w-full cursor-pointer rounded-xl bg-[#4f46e5] text-sm font-bold text-white shadow-lg shadow-[#4f46e5]/25 transition hover:bg-[#4338ca] focus:outline-none focus:ring-4 focus:ring-[#4f46e5]/20 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#4f46e5]"
    >
      {label}
    </button>
  );
};

export default Button;
