"use client";

import AuthFormFooter from "@/components/common/ui/auth-form-footer";
import AuthFormHeader from "@/components/common/ui/auth-form-header";
import Button from "@/components/common/ui/button";
import Input from "@/components/common/ui/input";
import { useForm } from "react-hook-form";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  receiveUpdates: boolean;
}

export const RegisterForm = () => {
  const { register, handleSubmit } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      receiveUpdates: false,
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("form data", data);
    // HTTP POST /auth/register
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

        <form className="space-y-3.5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            name="name"
            id="name"
            label="Full name"
            required
            type="text"
            placeholder="John Doe"
          />

          <Input
            register={register}
            name="email"
            id="email"
            label="Email address"
            required
            type="email"
            placeholder="john@example.com"
          />

          <Input
            register={register}
            name="password"
            id="password"
            label="Password"
            required
            type="password"
            placeholder="Create a password"
          />

          <Input
            register={register}
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm password"
            required
            type="password"
            placeholder="Confirm your password"
          />

          <label className="flex items-start gap-3 text-sm leading-6 text-[#64748b]">
            <input
              {...register("receiveUpdates")}
              type="checkbox"
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
