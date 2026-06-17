import React from "react";

interface IProps {
  title: string;
  description: string;
}

const AuthSidePanel = ({ title, description }: IProps) => {
  return (
    <div className="hidden bg-[#312e81] p-10 text-white lg:flex lg:flex-col lg:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c4b5fd]">
          Broadway Store
        </p>
        <h2 className="mt-8 max-w-sm text-5xl font-bold leading-tight">
          {title}
        </h2>
      </div>

      <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
        <p className="text-sm leading-6 text-white/80">{description}</p>
      </div>
    </div>
  );
};

export default AuthSidePanel;
