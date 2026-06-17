import AuthSidePanel from "@/components/common/ui/auth-side-panel";
import LoginForm from "@/components/forms/auth/login.form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "ECOM | sign in",
  description: "Ecommerce",
};

const LoginPage = () => {
  return (
    <main className="min-h-screen w-full bg-[#eef2ff] px-4 py-8 text-[#1e1b4b] sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-5xl overflow-hidden rounded-4xl border border-[#c7d2fe] bg-white shadow-2xl shadow-[#4f46e5]/10 lg:grid-cols-[1fr_1.1fr]">
        <AuthSidePanel
          title="Fresh picks, ready when you are."
          description="Sign in to continue shopping, track your orders, and manage your saved favorites."
        />

        <LoginForm />
      </section>
    </main>
  );
};

export default LoginPage;
