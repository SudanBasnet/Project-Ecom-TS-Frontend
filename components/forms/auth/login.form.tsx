"use client";

import { loginSchema } from "@/schema/auth.schema";
import AuthFormFooter from "@/components/common/ui/auth-form-footer";
import AuthFormHeader from "@/components/common/ui/auth-form-header";
import Button from "@/components/common/ui/button";
import Input from "@/components/common/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TLoginInput } from "@/types/auth.types";
import { login } from "@/api/auth.api";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { persistAuthSession } from "@/lib/auth-session";

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      return data.message;
    }
  }

  return "Unable to login. Please try again.";
};

const getSuccessMessage = (response: unknown) => {
  if (
    response &&
    typeof response === "object" &&
    "message" in response &&
    typeof response.message === "string"
  ) {
    return response.message;
  }

  return "Login successful";
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
  });

  const onSubmit = (data: TLoginInput) => {
    mutate(data, {
      onSuccess: (response) => {
        const session = persistAuthSession(response);
        void queryClient.invalidateQueries({ queryKey: ["me"] });
        toast.success(getSuccessMessage(response));
        router.replace(session.user.role === "admin" ? "/admin" : "/");
        router.refresh();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
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
            isValid={dirtyFields.email && !errors.email}
            required
          />

          <Input
            register={register}
            name="password"
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors?.password?.message}
            isValid={dirtyFields.password && !errors.password}
            required
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

          <Button
            label={isPending ? "Signing In..." : "Sign In"}
            type="submit"
            disabled={isPending}
            isLoading={isPending}
          />
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
