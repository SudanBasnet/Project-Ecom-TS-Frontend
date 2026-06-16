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
        <div className="hidden bg-[#312e81] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c4b5fd]">
              Broadway Store
            </p>
            <h2 className="mt-8 max-w-sm text-5xl font-bold leading-tight">
              Build your cart, save your style.
            </h2>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm leading-6 text-white/80">
              Create an account to save your details, revisit favorite products,
              and make every checkout smoother.
            </p>
          </div>
        </div>

        <RegisterForm />
      </section>
    </main>
  );
};

export default RegisterPage;
