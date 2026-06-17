import Input from "@/components/common/ui/input";
import React from "react";

export const LoginForm = () => {
  return (
    <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#4f46e5]">
            Welcome back
          </p>
          <h1 className="mt-3 text-4xl font-bold text-[#1e1b4b]">
            Sign in to your account
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#64748b]">
            Login to access your account and continue where you left off.
          </p>
        </div>

        <form action="" className="space-y-5">
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
            placeholder="Enter your password"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#64748b]">
              <input
                type="checkbox"
                className="size-4 rounded border-[#c7d2fe] accent-[#4f46e5]"
              />
              Remember me
            </label>
            <a href="#" className="font-semibold text-[#4338ca]">
              Forgot password?
            </a>
          </div>

          <button className="h-12 w-full cursor-pointer rounded-xl bg-[#4f46e5] text-sm font-bold text-white shadow-lg shadow-[#4f46e5]/25 transition hover:bg-[#4338ca] focus:outline-none focus:ring-4 focus:ring-[#4f46e5]/20">
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#64748b]">
          New here?{" "}
          <a href="/auth/register" className="font-bold text-[#4338ca]">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
