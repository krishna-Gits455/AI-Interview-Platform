import AppLayout from "../layouts/AppLayout";

import DashboardHeader from "../features/dashboard/components/DashboardHeader";
import QuickActions from "../features/dashboard/components/QuickActions";
import UpcomingInterviews from "../features/dashboard/components/UpcomingInterviews";
import RecentReports from "../features/dashboard/components/RecentReports";

export default function Dashboard() {
  return (
    <AppLayout>

      <div className="max-w-6xl space-y-6">

        <DashboardHeader />

        <QuickActions />

        <UpcomingInterviews />

        <RecentReports />

      </div>

    </AppLayout>
  );
}