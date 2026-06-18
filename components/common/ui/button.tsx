"use client";

interface IProps {
  label: string;
  type?: "reset" | "submit" | "button";
}

const Button = ({ label = "Button", type = "button" }: IProps) => {
  return (
    <button
      //   onClick={() => {}}
      type={type}
      className="h-12 w-full cursor-pointer rounded-xl bg-[#4f46e5] text-sm font-bold text-white shadow-lg shadow-[#4f46e5]/25 transition hover:bg-[#4338ca] focus:outline-none focus:ring-4 focus:ring-[#4f46e5]/20"
    >
      {label}
    </button>
  );
};

export default Button;
