"use client";

import { useState } from "react";
import AdminHeader from "./header";
import PageTransition from "@/components/common/ui/page-transition";
import Sidebar from "./sidebar";

const AdminShell = ({
  children,
  role = "admin",
}: Readonly<{
  children: React.ReactNode;
  role?: "admin" | "user";
}>) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        role={role}
      />

      <div className="min-h-screen lg:pl-72">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} role={role} />
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <PageTransition>{children}</PageTransition>
        </main>
        <footer className="border-t border-slate-200 px-6 py-5 text-center text-xs text-slate-500 lg:text-left">
          © 2026 Broadway Store. Admin workspace.
        </footer>
      </div>
    </div>
  );
};

export default AdminShell;
