import React from "react";

interface IProps {
  eyebrow: string;
  title: string;
  description: string;
}

const AuthFormHeader = ({ eyebrow, title, description }: IProps) => {
  return (
    <div className="mb-10">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#4f46e5]">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-bold text-[#1e1b4b]">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-[#64748b]">{description}</p>
    </div>
  );
};

export default AuthFormHeader;
