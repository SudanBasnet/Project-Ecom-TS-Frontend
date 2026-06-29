import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ToastProvider from "@/components/common/ui/toast-provider";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Broadway Store",
    template: "%s | Broadway Store",
  },
  description: "A simple ecommerce storefront built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased tracking-wider`}
    >
      <body className="min-h-screen">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
