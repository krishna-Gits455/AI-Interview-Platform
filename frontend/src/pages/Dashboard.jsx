import { useState } from "react";

import AppLayout from "../layouts/AppLayout";

import DashboardHeader from "../features/dashboard/components/DashboardHeader";
import QuickActions from "../features/dashboard/components/QuickActions";
import UpcomingInterviews from "../features/dashboard/components/UpcomingInterviews";
import RecentReports from "../features/dashboard/components/RecentReports";
import CreateInterviewModal from "../features/dashboard/components/CreateInterviewModal";

export default function Dashboard() {
  const [showModal, setShowModal] =
    useState(false);

  const [interviews, setInterviews] =
    useState([
      {
        id: 1,
        title: "Frontend Interview",
        date: "Tomorrow",
        time: "6 PM",
        language: "JavaScript",
      },
      {
        id: 2,
        title: "Backend Interview",
        date: "Friday",
        time: "4 PM",
        language: "Node.js",
      },
    ]);

  const handleCreateInterview =
    (interview) => {
      setInterviews((prev) => [
        interview,
        ...prev,
      ]);
    };

  return (
    <AppLayout>

      <div className="space-y-6 max-w-6xl">

        <DashboardHeader />

        <QuickActions
          onCreateInterview={() =>
            setShowModal(true)
          }
        />

        <UpcomingInterviews
          interviews={interviews}
        />

        <RecentReports />

        <CreateInterviewModal
          open={showModal}
          onClose={() =>
            setShowModal(false)
          }
          onCreate={
            handleCreateInterview
          }
        />

      </div>

    </AppLayout>
  );
}