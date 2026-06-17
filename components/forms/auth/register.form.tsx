import Input from "@/components/common/ui/input";
import React from "react";

export const RegisterForm = () => {
  return (
    <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14 ">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#4f46e5]">
            Create account
          </p>
          <h1 className="mt-3 text-4xl font-bold text-[#1e1b4b]">
            Join Broadway Store
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#64748b]">
            Create your account to save favorites, track orders, and check out
            faster.
          </p>
        </div>

        <form action="" className="space-y-5">
          <Input
            id="name"
            label="Full name"
            type="text"
            placeholder="John Doe"
          />

          <Input
            id="email"
            label="Email address"
            type="email"
            placeholder="john@example.com"
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Create a password"
          />

          <Input
            id="confirm-password"
            label="Confirm password"
            type="password"
            placeholder="Confirm your password"
          />

          <label className="flex items-start gap-3 text-sm leading-6 text-[#64748b]">
            <input
              type="checkbox"
              className="mt-1 size-4 rounded border-[#c7d2fe] accent-[#4f46e5]"
            />
            I agree to receive account updates and order notifications.
          </label>

          <button className="h-12 w-full cursor-pointer rounded-xl bg-[#4f46e5] text-sm font-bold text-white shadow-lg shadow-[#4f46e5]/25 transition hover:bg-[#4338ca] focus:outline-none focus:ring-4 focus:ring-[#4f46e5]/20">
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#64748b]">
          Already have an account?{" "}
          <a href="/auth/login" className="font-bold text-[#4338ca]">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
