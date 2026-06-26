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
import DashboardSidebar from "../features/dashboard/components/DashboardSidebar";
import CreateInterviewModal from "../features/dashboard/components/CreateInterviewModal";

import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();

const { user } = useAuthStore();


const [activeSection, setActiveSection] =
  useState("overview");


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

console.log("USER", user);

console.log("INTERVIEWS", interviews);

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

const invitationActions = invitations.map(
  (invitation) => ({
    id: `invite-${invitation._id}`,

    type: "invitation",

    title: invitation.title,

    subtitle: `Invitation from ${invitation.interviewer?.name}`,

    buttonLabel: "Accept",

    onButtonClick: () =>
      acceptInvitation(invitation._id),
  })
);

const joinActions = interviews
  .filter(
    (interview) =>
      interview.candidate === user?._id &&
      interview.status === "Scheduled"
  )
  .map((interview) => ({
    id: `join-${interview._id}`,

    type: "upcoming",

    title: interview.title,

    subtitle: `Interview ready to join`,

    buttonLabel: "Join Room",

    onButtonClick: () =>
      navigate(`/room/${interview._id}`),
  }));

const actionItems = [
  ...invitationActions,
  ...joinActions,
];

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
      roomId: i._id,
reportId: i._id,
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
    <div className="flex gap-8 items-start">

      <DashboardSidebar
  activeSection={activeSection}
  onSectionChange={setActiveSection}
/>

      <div className="flex-1 space-y-8">

        <section id="overview">
          <DashboardHero
            onCreateInterview={() =>
              setShowModal(true)
            }
          />
        </section>

        <section id="stats">
    <DashboardStats
        stats={stats}
    />
</section>

        <section id="actions">
          <DashboardActionCenter
            actions={actionItems}
          />
        </section>

        <section id="created">
          <CreatedByYouTable
            interviews={createdByYou}
          />
        </section>

        <section id="assigned">
          <AssignedToYouTable
            interviews={assignedToYou}
          />
        </section>

        <section id="reports">
          <RecentReportsGrid
            reports={recentReports}
          />
        </section>

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
