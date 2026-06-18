import {
  useEffect,
  useState,
} from "react";

import useInterviewStore from "../store/interviewStore";

import AppLayout from "../layouts/AppLayout";

import DashboardHeader from "../features/dashboard/components/DashboardHeader";
import QuickActions from "../features/dashboard/components/QuickActions";
import UpcomingInterviews from "../features/dashboard/components/UpcomingInterviews";
import RecentReports from "../features/dashboard/components/RecentReports";
import CreateInterviewModal from "../features/dashboard/components/CreateInterviewModal";
import PendingInvitations from "../features/dashboard/components/PendingInvitations";

export default function Dashboard() {
  const [showModal, setShowModal] =
    useState(false);

  const {
  interviews,
  invitations,
  fetchInterviews,
  fetchInvitations,
  acceptInvitation,
  isLoading,
  invitationsLoading,
} = useInterviewStore();

useEffect(() => {
  fetchInterviews();
  fetchInvitations();
}, [fetchInterviews, fetchInvitations]);

  return (
    <AppLayout>

      <div className="space-y-6 max-w-6xl">

        <DashboardHeader />

        <QuickActions
          onCreateInterview={() =>
            setShowModal(true)
          }
        />

        <PendingInvitations
          invitations={invitations}
          isLoading={invitationsLoading}
          onAccept={acceptInvitation}
        />

        <UpcomingInterviews
  interviews={interviews}
  isLoading={isLoading}
/>

        <RecentReports />

        <CreateInterviewModal
  open={showModal}
  onClose={() =>
    setShowModal(false)
  }
/>

      </div>

    </AppLayout>
  );
}
