import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ToastProvider from "@/components/common/ui/toast-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import AuthProvider from "@/providers/auth.provider";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "@/providers/theme.provider";

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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased tracking-wider`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('broadway-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var d=document.documentElement;d.classList.toggle('dark',t==='dark');d.dataset.theme=t;d.style.colorScheme=t}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen transition-colors duration-300">
        <ThemeProvider>
          <ReactQueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </ReactQueryProvider>
        </ThemeProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
