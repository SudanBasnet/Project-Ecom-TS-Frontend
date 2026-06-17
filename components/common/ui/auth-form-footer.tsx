import Link from "next/link";
import React from "react";

interface IProps {
  text: string;
  linkText: string;
  href: string;
  compact?: boolean;
}

const AuthFormFooter = ({
  compact = false,
  text,
  linkText,
  href,
}: IProps) => {
  return (
    <p
      className={`text-center text-sm text-[#64748b] ${
        compact ? "mt-5" : "mt-8"
      }`}
    >
      {text}{" "}
      <Link href={href} className="font-bold text-[#4338ca]">
        {linkText}
      </Link>
    </p>
  );
};

export default AuthFormFooter;
