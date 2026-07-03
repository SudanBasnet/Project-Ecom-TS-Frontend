import DashboardOverview from "@/components/admin/dashboard-overview";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
};

const UserDashboardPage = () => <DashboardOverview role="user" />;

export default UserDashboardPage;
