import React from "react";

interface IProps {
  text: string;
  linkText: string;
  href: string;
}

const AuthFormFooter = ({ text, linkText, href }: IProps) => {
  return (
    <p className="mt-8 text-center text-sm text-[#64748b]">
      {text}{" "}
      <a href={href} className="font-bold text-[#4338ca]">
        {linkText}
      </a>
    </p>
  );
};

export default AuthFormFooter;
