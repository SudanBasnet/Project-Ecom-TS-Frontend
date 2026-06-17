import AuthFormFooter from "@/components/common/ui/auth-form-footer";
import AuthFormHeader from "@/components/common/ui/auth-form-header";
import Input from "@/components/common/ui/input";
import React from "react";

export const RegisterForm = () => {
  return (
    <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14 ">
      <div className="w-full max-w-md">
        <AuthFormHeader
          eyebrow="Create account"
          title="Join Broadway Store"
          description="Create your account to save favorites, track orders, and check out faster."
        />

        <form action="" className="space-y-5">
          <Input
            id="name"
            label="Full name"
            required
            type="text"
            placeholder="John Doe"
          />

          <Input
            id="email"
            label="Email address"
            required
            type="email"
            placeholder="john@example.com"
          />

          <Input
            id="password"
            label="Password"
            required
            type="password"
            placeholder="Create a password"
          />

          <Input
            id="confirm-password"
            label="Confirm password"
            required
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

        <AuthFormFooter
          text="Already have an account?"
          href="/auth/login"
          linkText="Sign in"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
