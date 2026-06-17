import AuthSidePanel from "@/components/common/ui/auth-side-panel";
import RegisterForm from "@/components/forms/auth/register.form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "ECOM | create account",
  description: "Ecommerce",
};

const RegisterPage = () => {
  return (
    <main className="min-h-screen w-full bg-[#eef2ff] px-4 py-8 text-[#1e1b4b] sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#c7d2fe] bg-white shadow-2xl shadow-[#4f46e5]/10 lg:grid-cols-[1fr_1.1fr]">
        <AuthSidePanel
          title="Build your cart, save your style."
          description="Create an account to save your details, revisit favorite products, and make every checkout smoother."
        />

        <RegisterForm />
      </section>
    </main>
  );
};

export default RegisterPage;
