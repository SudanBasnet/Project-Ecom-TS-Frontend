import AdminHeader from "@/components/common/layout/admin/header";
import Sidebar from "@/components/common/layout/admin/sidebar";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="h-100vh flex">
      <Sidebar />
      <AdminHeader />
      {children}
    </main>
  );
};

export default Layout;
