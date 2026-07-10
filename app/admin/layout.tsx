"use client";

import AdminShell from "@/components/common/layout/admin/admin-shell";
import withAuth from "@/hoc/withAuth.hoc";
import { Role } from "@/types/enum.types";

const Layout = ({ children }: LayoutProps<"/admin">) => (
  <AdminShell>{children}</AdminShell>
);

export default withAuth(Layout, [Role.ADMIN, Role.SUPER_ADMIN]);
