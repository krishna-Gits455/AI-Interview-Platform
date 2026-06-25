import {
  useEffect,
  useState,
} from "react";

import useInterviewStore from "../store/interviewStore";

import AppLayout from "../layouts/AppLayout";

import DashboardHero from "../features/dashboard/components/DashboardHero";
import DashboardStats from "../features/dashboard/components/DashboardStats";
import DashboardActionCenter from "../features/dashboard/components/DashboardActionCenter";
import CreatedByYouTable from "../features/dashboard/components/CreatedByYouTable";
import AssignedToYouTable from "../features/dashboard/components/AssignedToYouTable";
import RecentReportsGrid from "../features/dashboard/components/RecentReportsGrid";

import CreateInterviewModal from "../features/dashboard/components/CreateInterviewModal";

import useAuthStore from "../store/authStore";

export default function Dashboard() {



const { user } = useAuthStore();





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
  if (interviews.length) {
    console.log(
      "FIRST INTERVIEW",
      interviews[0]
    );
  }
}, [interviews]);

useEffect(() => {
  console.log(
    "USER",
    user
  );
}, [user]);

useEffect(() => {
  console.log(user);
  console.log(interviews);
}, [user, interviews]);

const stats = {
  scheduled: interviews.filter(
    (i) => i.status === "Scheduled"
  ).length,

  inProgress: interviews.filter(
    (i) => i.status === "In Progress"
  ).length,

  completed: interviews.filter(
    (i) => i.status === "Completed"
  ).length,

  pendingFeedback: interviews.filter(
    (i) =>
      i.status === "Completed" &&
      !i.result
  ).length,
};

const actionItems = invitations.map(
  (invitation) => ({
    id: invitation._id,

    title: invitation.title,

    description: `Invitation from ${invitation.interviewer?.name}`,

    type: "invitation",

    actionLabel: "Accept",

    onAction: () =>
      acceptInvitation(
        invitation._id
      ),
  })
);

const createdByYou =
  interviews
    .filter(
      (i) =>
        i.interviewer ===
        user._id
    )
    .map((i) => ({
      id: i._id,
      title: i.title,
      candidate:
        i.candidateEmail,
      dateTime:
        new Date(
          i.scheduledAt
        ).toLocaleString(),
      status: i.status,
    }));

const assignedToYou =
  interviews
    .filter(
      (i) =>
        i.candidate ===
        user._id
    )
    .map((i) => ({
      id: i._id,
      title: i.title,
      interviewer:
        i.interviewer,
      dateTime:
        new Date(
          i.scheduledAt
        ).toLocaleString(),
      status: i.status,
    }));

    const recentReports =
  interviews
    .filter(
      (i) =>
        i.status ===
          "Completed" &&
        i.result
    )
    .slice(0, 4)
    .map((i) => ({
      id: i._id,

      title: i.title,

      score:
        i.result.rating,

      verdict:
        i.result
          .recommendation,

      completedAt:
        i.result
          .completedAt,
    }));

useEffect(() => {
  fetchInterviews();
  fetchInvitations();
}, [fetchInterviews, fetchInvitations]);

  return (
    <AppLayout>
  <div className="w-full max-w-none space-y-8">

    

    <div className="flex-1 space-y-8">

      <DashboardHero
        onCreateInterview={() =>
          setShowModal(true)
        }
      />

      <DashboardStats
        stats={stats}
      />

      <DashboardActionCenter
        actions={actionItems}
      />

      <CreatedByYouTable
        interviews={
          createdByYou
        }
      />

      <AssignedToYouTable
        interviews={
          assignedToYou
        }
      />

      <RecentReportsGrid
        reports={
          recentReports
        }
      />

    </div>

  </div>

  <CreateInterviewModal
    open={showModal}
    onClose={() =>
      setShowModal(false)
    }
  />
</AppLayout>
  );
}
