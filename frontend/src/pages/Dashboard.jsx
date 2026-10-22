import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileBarChart2,
  FileText,
  Home,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Play,
  Plus,
  UserCircle,
  Users,
  Zap,
} from "lucide-react";

import AppLayout from "../layouts/AppLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import useAuthStore from "../store/authStore";
import useInterviewStore from "../store/interviewStore";
import HeroIllustration from "../assets/dashboard/hero-illustration.png";

/* ─── Constants ─────────────────────────────────────────────── */

const SIDEBAR_NAV = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "actions", label: "Action Center", icon: Zap },
  { id: "created", label: "Created By You", icon: UserCircle },
  { id: "assigned", label: "Assigned To You", icon: Users },
  { id: "reports", label: "Recent Reports", icon: FileText },
];

const STATUS_STYLES = {
  Scheduled: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  "In Progress":
    "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  Completed:
    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
};

const ACTION_TYPE_STYLES = {
  invitation: {
    label: "Invitation Received",
    labelColor: "text-fuchsia-400",
    borderColor: "border-fuchsia-500/30",
    button: "bg-violet-600 hover:bg-violet-500 text-white",
    icon: Mail,
  },
  upcoming: {
    label: "Starts in 30 min",
    labelColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    button: "bg-blue-600 hover:bg-blue-500 text-white",
    icon: Clock,
  },
  report: {
    label: "AI Report Ready",
    labelColor: "text-yellow-400",
    borderColor: "border-yellow-500/30",
    button: "bg-yellow-500 hover:bg-yellow-400 text-black font-semibold",
    icon: FileBarChart2,
  },
  feedback: {
    label: "Feedback Pending",
    labelColor: "text-green-400",
    borderColor: "border-green-500/30",
    button: "bg-green-600 hover:bg-green-500 text-white",
    icon: MessageSquare,
  },
};

const VERDICT_CONFIG = {
  Hire: {
    accent: "border-t-green-500",
    badge: "bg-green-500/15 text-green-400",
    score: "text-green-400",
  },
  Maybe: {
    accent: "border-t-yellow-500",
    badge: "bg-yellow-500/15 text-yellow-400",
    score: "text-yellow-400",
  },
  Reject: {
    accent: "border-t-red-500",
    badge: "bg-red-500/15 text-red-400",
    score: "text-red-400",
  },
};

const CARD =
  "rounded-3xl border border-slate-800/80 bg-[#0d1117] shadow-lg shadow-black/20";

/* ─── Helpers ───────────────────────────────────────────────── */

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        STATUS_STYLES[status] ?? STATUS_STYLES.Completed
      }`}
    >
      {status}
    </span>
  );
}

function SectionHeader({
  icon: Icon,
  iconColor = "text-purple-400",
  title,
  subtitle,
  viewAllLabel,
  onViewAll,
}) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={iconColor}>
            <Icon size={22} strokeWidth={1.5} />
          </div>
        )}
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>
      {(viewAllLabel || onViewAll) && (
        <button
          onClick={onViewAll}
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
        >
          {viewAllLabel || "View all"}
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

/* ─── Create Interview Modal ────────────────────────────────── */

function CreateInterviewModal({ open, onClose }) {
  const createInterview = useInterviewStore(
    (state) => state.createInterview
  );

  const [formData, setFormData] = useState({
    title: "",
    candidateEmail: "",
    date: "",
    time: "",
    language: "JavaScript",
    difficulty: "Easy",
  });
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const scheduledAt = new Date(
        `${formData.date}T${formData.time}`
      );

      await createInterview({
        title: formData.title,
        candidateEmail: formData.candidateEmail,
        language: formData.language,
        difficulty: formData.difficulty,
        scheduledAt,
      });

      onClose();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create interview"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <h2 className="mb-6 text-xl font-bold text-white">
          Create Interview
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Interview Title" name="title" onChange={handleChange} />
          <Input
            label="Candidate Email"
            name="candidateEmail"
            onChange={handleChange}
          />
          <Input type="date" label="Date" name="date" onChange={handleChange} />
          <Input type="time" label="Time" name="time" onChange={handleChange} />

          <div>
            <label className="mb-2 block text-sm font-medium">Language</label>
            <select
              name="language"
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 text-white"
            >
              <option>JavaScript</option>
              <option>Python</option>
              <option>Java</option>
              <option>C++</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Difficulty</label>
            <select
              name="difficulty"
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 text-white"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {loading ? "Creating..." : "Create Interview"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ────────────────────────────────────────── */

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const reportsScrollRef = useRef(null);

  const [activeSection, setActiveSection] = useState("overview");
  const [showModal, setShowModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => localStorage.getItem("dashboard-sidebar") === "collapsed"
  );

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
      console.log("FIRST INTERVIEW", interviews[0]);
    }
  }, [interviews]);

  useEffect(() => {
    console.log("USER", user);
  }, [user]);

  useEffect(() => {
    console.log(user);
    console.log(interviews);
  }, [user, interviews]);

  useEffect(() => {
    fetchInterviews();
    fetchInvitations();
  }, [fetchInterviews, fetchInvitations]);

  useEffect(() => {
    localStorage.setItem(
      "dashboard-sidebar",
      sidebarCollapsed ? "collapsed" : "expanded"
    );
  }, [sidebarCollapsed]);

  const stats = {
    scheduled: interviews.filter((i) => i.status === "Scheduled").length,
    inProgress: interviews.filter((i) => i.status === "In Progress").length,
    completed: interviews.filter((i) => i.status === "Completed").length,
    pendingFeedback: interviews.filter(
      (i) => i.status === "Completed" && !i.result
    ).length,
  };

  const invitationActions = invitations.map((invitation) => ({
    id: `invite-${invitation._id}`,
    type: "invitation",
    title: invitation.title,
    subtitle: `Invitation from ${invitation.interviewer?.name}`,
    buttonLabel: "Accept",
    onButtonClick: () => acceptInvitation(invitation._id),
  }));

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
      subtitle: "Interview ready to join",
      buttonLabel: "Join Room",
      onButtonClick: () => navigate(`/room/${interview._id}`),
    }));

  const actionItems = [...invitationActions, ...joinActions];

  const createdByYou = interviews
    .filter((i) => i.interviewer === user._id)
    .map((i) => ({
      id: i._id,
      title: i.title,
      candidate: i.candidateEmail,
      dateTime: new Date(i.scheduledAt).toLocaleString(),
      status: i.status,
      roomId: i._id,
      reportId: i._id,
    }));

  const assignedToYou = interviews
    .filter((i) => i.candidate === user._id)
    .map((i) => ({
      id: i._id,
      title: i.title,
      interviewer: i.interviewer,
      dateTime: new Date(i.scheduledAt).toLocaleString(),
      status: i.status,
    }));

  const recentReports = interviews
    .filter((i) => i.status === "Completed" && i.result)
    .slice(0, 4)
    .map((i) => ({
      id: i._id,
      title: i.title,
      score: i.result.rating,
      verdict: i.result.recommendation,
      completedAt: i.result.completedAt,
    }));

  const statCards = [
    {
      icon: CalendarDays,
      iconColor: "text-violet-400",
      bg: "bg-violet-500/10",
      value: stats.scheduled,
      label: "Scheduled",
      sublabel: "Upcoming interviews",
    },
    {
      icon: Play,
      iconColor: "text-blue-400",
      bg: "bg-blue-500/10",
      value: stats.inProgress,
      label: "In Progress",
      sublabel: "Ongoing interviews",
    },
    {
      icon: CheckCircle2,
      iconColor: "text-emerald-400",
      bg: "bg-emerald-500/10",
      value: stats.completed,
      label: "Completed",
      sublabel: "Finished interviews",
    },
    {
      icon: Clock,
      iconColor: "text-yellow-400",
      bg: "bg-yellow-500/10",
      value: stats.pendingFeedback,
      label: "Pending Feedback",
      sublabel: "Awaiting feedback",
    },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollReportsNext = () => {
    reportsScrollRef.current?.scrollBy({ left: 310, behavior: "smooth" });
  };

  return (
    <AppLayout>
      <div className="flex items-start gap-10">
        {/* ── Sidebar ── */}
        <aside
          className={`sticky top-[8.5rem] flex shrink-0 flex-col self-start rounded-3xl border border-slate-800/80 bg-[#0d1117] shadow-lg shadow-black/20 transition-all duration-300 ${
            sidebarCollapsed ? "w-[4.5rem]" : "w-80"
          } h-[calc(100vh-8.5rem-2rem)]`}
        >
          <div className="border-b border-slate-800 px-7 py-7">
            <div
              className={`flex ${
                sidebarCollapsed
                  ? "justify-center"
                  : "items-center gap-4"
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-900/40">
                <LayoutDashboard size={22} className="text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Dashboard
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">Navigation</p>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            {SIDEBAR_NAV.map(({ id, label, icon: Icon }) => {
              const active = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  title={sidebarCollapsed ? label : undefined}
                  className={`flex w-full items-center rounded-xl text-[15px] font-medium transition-all duration-200 ${
                    sidebarCollapsed
                      ? "justify-center px-0 py-4"
                      : "gap-4 px-5 py-4"
                  } ${
                    active
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={22} strokeWidth={1.8} className="shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="truncate">{label}</span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-slate-800 p-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`flex w-full rounded-xl py-3.5 text-[15px] text-slate-400 transition hover:bg-slate-800 hover:text-white ${
                sidebarCollapsed
                  ? "justify-center"
                  : "items-center gap-3 px-4"
              }`}
            >
              {sidebarCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <>
                  <ChevronLeft size={20} />
                  Collapse
                </>
              )}
            </button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <div className="flex min-w-0 flex-1 flex-col gap-10">
          {/* Hero */}
          <section id="overview" className="mt-8 scroll-mt-40">
            <div
              className={`${CARD} relative min-h-[360px] overflow-hidden bg-gradient-to-br from-[#181038] via-[#121827] to-[#0b1220]`}
            >
              <div className="pointer-events-none absolute -left-24 -top-32 h-96 w-96 rounded-full bg-violet-700/10 blur-[120px]" />
              <div className="pointer-events-none absolute -bottom-16 right-0 h-72 w-80 rounded-full bg-indigo-600/10 blur-[90px]" />

              <div className="relative flex min-h-[360px]">
                <div className="z-10 flex flex-1 flex-col justify-center py-12 pl-12 pr-8 lg:pl-14">
                  <p className="text-sm font-medium text-slate-400">
                    Welcome back
                  </p>
                  <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight text-white lg:text-[42px]">
                    {getGreeting()}, {user?.name || "Rahul"} 👋
                  </h1>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-400">
                    Manage interviews, collaborate with candidates and review
                    AI-generated interview reports from one beautiful workspace.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <div className="flex items-center gap-3.5 rounded-2xl border border-slate-700/70 bg-slate-900/50 px-5 py-3.5">
                      <CalendarDays size={20} className="text-violet-400" />
                      <div>
                        <p className="text-xs text-slate-500">Today</p>
                        <p className="text-sm font-semibold text-white">
                          2 Interviews
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3.5 rounded-2xl border border-slate-700/70 bg-slate-900/50 px-5 py-3.5">
                      <MessageSquare size={20} className="text-indigo-400" />
                      <div>
                        <p className="text-xs text-slate-500">Pending</p>
                        <p className="text-sm font-semibold text-white">
                          1 Feedback
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative w-[44%] shrink-0">
                  <button
                    onClick={() => setShowModal(true)}
                    className="absolute right-8 top-1/2 z-20 inline-flex -translate-y-1/2 items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 transition hover:bg-indigo-500"
                  >
                    <Plus size={18} strokeWidth={2.5} />
                    Create Interview
                  </button>
                  <img
                    src={HeroIllustration}
                    alt=""
                    className="absolute bottom-0 right-0 w-[125%] max-w-none select-none object-contain object-bottom-right pointer-events-none"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section id="stats" className="scroll-mt-40">
            <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
              {statCards.map(
                ({ icon: Icon, iconColor, bg, value, label, sublabel }) => (
                  <div
                    key={label}
                    className={`${CARD} flex flex-col justify-between p-6 transition hover:border-slate-700`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}
                    >
                      <Icon size={24} className={iconColor} strokeWidth={1.8} />
                    </div>
                    <div className="mt-5">
                      <p className="text-3xl font-bold text-white">{value}</p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {label}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">{sublabel}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Action Center */}
          <section id="actions" className={`${CARD} p-8`}>
            <SectionHeader
              icon={Zap}
              iconColor="text-yellow-400"
              title="Action Center"
              subtitle="Items that need your immediate attention"
              viewAllLabel={`View all (${actionItems.length})`}
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {actionItems.length ? (
                actionItems.map((action) => {
                  const style =
                    ACTION_TYPE_STYLES[action.type] ??
                    ACTION_TYPE_STYLES.invitation;
                  const ActionIcon = style.icon;

                  return (
                    <div
                      key={action.id}
                      className={`flex flex-col rounded-2xl border ${style.borderColor} bg-[#111827] p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20`}
                    >
                      <div className="flex items-center gap-2.5">
                        <ActionIcon size={18} className={style.labelColor} />
                        <span
                          className={`text-sm font-semibold ${style.labelColor}`}
                        >
                          {style.label}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold leading-snug text-white">
                        {action.title}
                      </h3>
                      {action.subtitle && (
                        <p className="mt-1.5 text-sm text-slate-400">
                          {action.subtitle}
                        </p>
                      )}
                      <button
                        onClick={action.onButtonClick}
                        className={`mt-5 inline-flex h-10 items-center justify-center rounded-lg text-sm font-semibold transition ${style.button}`}
                      >
                        {action.buttonLabel}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full flex items-center justify-center rounded-2xl border border-dashed border-slate-700 py-14 text-slate-500">
                  You&apos;re all caught up 🎉
                </div>
              )}
            </div>
          </section>

          {/* Created By You */}
          <section id="created" className={`${CARD} p-8`}>
            <SectionHeader
              icon={UserCircle}
              iconColor="text-violet-400"
              title="Created By You"
              subtitle="Interviews you've scheduled and manage."
              viewAllLabel="View all"
            />

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    {["Interview", "Candidate", "Date", "Status", "Action"].map(
                      (col, i) => (
                        <th
                          key={col}
                          className={`pb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 ${
                            i === 4 ? "text-right" : "text-left"
                          }`}
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {createdByYou.map((interview) => (
                    <tr
                      key={interview.id}
                      className="border-b border-slate-800/60 transition hover:bg-slate-800/20"
                    >
                      <td className="py-5 pr-4">
                        <div className="font-medium text-white">
                          {interview.title}
                        </div>
                      </td>
                      <td className="py-5 pr-4 text-sm text-slate-400">
                        {interview.candidate}
                      </td>
                      <td className="whitespace-nowrap py-5 pr-4 text-sm text-slate-400">
                        {interview.dateTime}
                      </td>
                      <td className="py-5 pr-4">
                        <StatusBadge status={interview.status} />
                      </td>
                      <td className="py-5">
                        <div className="flex justify-end">
                          {interview.status === "Completed" ? (
                            <button
                              onClick={() =>
                                navigate(`/report/${interview.id}`)
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800"
                            >
                              <FileText size={14} />
                              Report
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                navigate(`/room/${interview.id}`)
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-violet-500"
                            >
                              <Play size={14} />
                              {interview.status === "In Progress"
                                ? "Resume"
                                : "Join"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Assigned To You */}
          <section id="assigned" className={`${CARD} p-8`}>
            <SectionHeader
              icon={Users}
              iconColor="text-blue-400"
              title="Assigned To You"
              subtitle="Interviews assigned to you."
              viewAllLabel="View all"
            />

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    {[
                      "Interview",
                      "Interviewer",
                      "Date",
                      "Status",
                      "Action",
                    ].map((col, i) => (
                      <th
                        key={col}
                        className={`pb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 ${
                          i === 4 ? "text-right" : "text-left"
                        }`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {assignedToYou.map((interview) => (
                    <tr
                      key={interview.id}
                      className="border-b border-slate-800/60 transition hover:bg-slate-800/20"
                    >
                      <td className="py-5 pr-4">
                        <div className="font-medium text-white">
                          {interview.title}
                        </div>
                      </td>
                      <td className="py-5 pr-4 text-sm text-slate-400">
                        {interview.interviewer}
                      </td>
                      <td className="whitespace-nowrap py-5 pr-4 text-sm text-slate-400">
                        {interview.dateTime}
                      </td>
                      <td className="py-5 pr-4">
                        <StatusBadge status={interview.status} />
                      </td>
                      <td className="py-5">
                        <div className="flex justify-end">
                          {interview.status === "Completed" ? (
                            <button
                              onClick={() =>
                                navigate(
                                  `/interviews/${interview.id}/result`
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800"
                            >
                              <FileText size={14} />
                              View Report
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                navigate(`/room/${interview.id}`)
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-violet-500"
                            >
                              <Play size={14} />
                              {interview.status === "In Progress"
                                ? "Resume"
                                : "Join"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recent Reports */}
          <section id="reports" className={`${CARD} p-8`}>
            <SectionHeader
              icon={FileText}
              iconColor="text-slate-400"
              title="Recent Reports"
              subtitle="AI-generated reports from completed interviews"
              viewAllLabel="View all reports"
            />

            <div className="relative">
              <div
                ref={reportsScrollRef}
                className="flex gap-5 overflow-x-auto scroll-smooth pr-12"
              >
                {recentReports.map((report) => {
                  const style =
                    VERDICT_CONFIG[report.verdict] ??
                    VERDICT_CONFIG.Maybe;

                  return (
                    <div
                      key={report.id}
                      className={`flex h-[170px] w-[285px] shrink-0 flex-col rounded-2xl border border-slate-800 border-t-[3px] ${style.accent} bg-[#111827] p-5 transition hover:-translate-y-0.5 hover:border-slate-700`}
                    >
                      <h3 className="text-[15px] font-semibold leading-6 text-white">
                        {report.title}
                      </h3>
                      <div className="mt-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium ${style.badge}`}
                        >
                          {report.verdict}
                        </span>
                        <div
                          className={`mt-3 text-3xl font-bold ${style.score}`}
                        >
                          {report.score}
                          <span className="text-lg text-slate-500">/10</span>
                        </div>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          {report.completedAt
                            ? new Date(
                                report.completedAt
                              ).toLocaleDateString()
                            : ""}
                        </span>
                        <button
                          onClick={() =>
                            navigate(`/report/${report.id}`)
                          }
                          className="flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300"
                        >
                          View
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {recentReports.length > 4 && (
                <button
                  onClick={scrollReportsNext}
                  className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition hover:border-indigo-500 hover:bg-indigo-600"
                >
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          </section>
        </div>
      </div>

      <CreateInterviewModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </AppLayout>
  );
}
