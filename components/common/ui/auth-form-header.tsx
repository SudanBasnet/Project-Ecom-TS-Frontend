import React from "react";

interface IProps {
  eyebrow: string;
  title: string;
  description: string;
  compact?: boolean;
}

const AuthFormHeader = ({
  compact = false,
  eyebrow,
  title,
  description,
}: IProps) => {
  return (
    <div className={compact ? "mb-6" : "mb-10"}>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#4f46e5]">
        {eyebrow}
      </p>
      <h1
        className={`mt-3 font-bold text-[#1e1b4b] ${
          compact ? "text-3xl" : "text-4xl"
        }`}
      >
        {title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-[#64748b]">{description}</p>
    </div>
  );
};

export default AuthFormHeader;
