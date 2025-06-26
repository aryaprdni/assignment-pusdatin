import { AdminRoute } from "@/components/admin-route";
import DashboardPageContent from "@/features/dashboard/dashboard";

export default function DashboardPage() {
  return (
    <AdminRoute>
      <DashboardPageContent />
    </AdminRoute>
  );
}
