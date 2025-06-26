import { AdminRoute } from "@/components/admin-route";
import Navbar from "@/components/navbar";
import DashboardPageContent from "@/features/dashboard/dashboard";

export default function DashboardPage() {
  return (
    <AdminRoute>
      <Navbar />
      <DashboardPageContent />
    </AdminRoute>
  );
}
