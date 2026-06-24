import AdminShell from "@/components/common/layout/admin/admin-shell";

const Layout = ({ children }: LayoutProps<"/admin">) => (
  <AdminShell>{children}</AdminShell>
);

export default Layout;
