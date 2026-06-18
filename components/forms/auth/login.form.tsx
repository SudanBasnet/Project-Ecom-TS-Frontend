"use client";

import AuthFormFooter from "@/components/common/ui/auth-form-footer";
import AuthFormHeader from "@/components/common/ui/auth-form-header";
import Button from "@/components/common/ui/button";
import Input from "@/components/common/ui/input";
import React, { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form data", formData);
  };
  return (
    <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
      <div className="w-full max-w-md">
        <AuthFormHeader
          eyebrow="Welcome back"
          title="Sign in to your account"
          description="Login to access your account and continue where you left off."
        />

        <form action="" className="space-y-5" onSubmit={onSubmit}>
          <Input
            onChange={onInputChange}
            id="email"
            label="Email address"
            type="email"
            placeholder="john@example.com"
          />

          <Input
            onChange={onInputChange}
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

          <Button label="Sign In" type="submit" />
        </form>

        <AuthFormFooter
          text="New here?"
          href="/auth/register"
          linkText="Create an account"
        />
      </div>
    </div>
  );
};

export default LoginForm;
