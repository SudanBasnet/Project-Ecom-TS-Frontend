"use client";

import AuthFormFooter from "@/components/common/ui/auth-form-footer";
import AuthFormHeader from "@/components/common/ui/auth-form-header";
import Button from "@/components/common/ui/button";
import Input from "@/components/common/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  console.log(errors);

  const onSubmit = (data: { email: string; password: string }) => {
    console.log("form data", data);
    // HTTP POST /auth/login
  };

  return (
    <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
      <div className="w-full max-w-md">
        <AuthFormHeader
          eyebrow="Welcome back"
          title="Sign in to your account"
          description="Login to access your account and continue where you left off."
        />

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            name="email"
            id="email"
            label="Email address"
            type="email"
            placeholder="john@example.com"
            error={errors?.email?.message}
          />

          <Input
            register={register}
            name="password"
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors?.password?.message}
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
