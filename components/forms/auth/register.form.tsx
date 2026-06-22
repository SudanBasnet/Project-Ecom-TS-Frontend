"use client";

import { registerSchema } from "@/schema/auth.schema";
import AuthFormFooter from "@/components/common/ui/auth-form-footer";
import AuthFormHeader from "@/components/common/ui/auth-form-header";
import Button from "@/components/common/ui/button";
import Input from "@/components/common/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TRegisterInput } from "@/types/auth.types";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  receiveUpdates: boolean;
}

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm<RegisterFormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      receiveUpdates: false,
    },
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: TRegisterInput) => {
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
            error={errors.name?.message}
            isValid={dirtyFields.name && !errors.name}
          />

          <Input
            register={register}
            name="email"
            id="email"
            label="Email address"
            required
            type="email"
            placeholder="john@example.com"
            error={errors.email?.message}
            isValid={dirtyFields.email && !errors.email}
          />

          <Input
            register={register}
            name="password"
            id="password"
            label="Password"
            required
            type="password"
            placeholder="Create a password"
            error={errors.password?.message}
            isValid={dirtyFields.password && !errors.password}
          />

          <Input
            register={register}
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm password"
            required
            type="password"
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            isValid={dirtyFields.confirmPassword && !errors.confirmPassword}
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
