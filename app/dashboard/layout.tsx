import AdminShell from "@/components/common/layout/admin/admin-shell";

const Layout = ({ children }: LayoutProps<"/dashboard">) => (
  <AdminShell role="user">{children}</AdminShell>
);

export default Layout;
