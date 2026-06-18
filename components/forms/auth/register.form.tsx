"use client";

import AuthFormFooter from "@/components/common/ui/auth-form-footer";
import AuthFormHeader from "@/components/common/ui/auth-form-header";
import Button from "@/components/common/ui/button";
import Input from "@/components/common/ui/input";
import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  receiveUpdates: boolean;
}

export const RegisterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    receiveUpdates: false,
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
    <div className="flex items-center justify-center px-6 py-6 sm:px-10 lg:px-12">
      <div className="w-full max-w-md">
        <AuthFormHeader
          compact
          eyebrow="Create account"
          title="Join Broadway Store"
          description="Create your account to save favorites, track orders, and check out faster."
        />

        <form action="" className="space-y-3.5" onSubmit={onSubmit}>
          <Input
            onChange={onInputChange}
            id="name"
            label="Full name"
            required
            type="text"
            placeholder="John Doe"
          />

          <Input
            onChange={onInputChange}
            id="email"
            label="Email address"
            required
            type="email"
            placeholder="john@example.com"
          />

          <Input
            onChange={onInputChange}
            id="password"
            label="Password"
            required
            type="password"
            placeholder="Create a password"
          />

          <Input
            onChange={onInputChange}
            id="confirmPassword"
            label="Confirm password"
            required
            type="password"
            placeholder="Confirm your password"
          />

          <label className="flex items-start gap-3 text-sm leading-6 text-[#64748b]">
            <input
              type="checkbox"
              checked={formData.receiveUpdates}
              onChange={(e) =>
                setFormData((previousData) => ({
                  ...previousData,
                  receiveUpdates: e.target.checked,
                }))
              }
              className="mt-1 size-4 rounded border-[#c7d2fe] accent-[#4f46e5]"
            />
            I agree to receive account updates and order notifications.
          </label>

          <Button label="Create Account" type="submit" />
        </form>

        <AuthFormFooter
          compact
          text="Already have an account?"
          href="/auth/login"
          linkText="Sign in"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
