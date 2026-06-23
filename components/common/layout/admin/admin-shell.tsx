"use client";

import { useState } from "react";
import AdminHeader from "./header";
import Sidebar from "./sidebar";

const AdminShell = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-h-screen lg:pl-72">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
        <footer className="border-t border-slate-200 px-6 py-5 text-center text-xs text-slate-500 lg:text-left">
          © 2026 Broadway Store. Admin workspace.
        </footer>
      </div>
    </div>
  );
};

export default AdminShell;
