import { CalendarDays, Play, CheckCircle2, Clock } from "lucide-react";
import StatCard from "./StatCard";

const DashboardStats = ({ scheduled = 0, inProgress = 0, completed = 0, pendingFeedback = 0 }) => {
  const stats = [
    {
      icon: CalendarDays,
      iconColor: "text-purple-400",
      value: scheduled,
      label: "Scheduled",
      sublabel: "Upcoming interviews",
    },
    {
      icon: Play,
      iconColor: "text-blue-400",
      value: inProgress,
      label: "In Progress",
      sublabel: "Ongoing interviews",
    },
    {
      icon: CheckCircle2,
      iconColor: "text-green-400",
      value: completed,
      label: "Completed",
      sublabel: "Finished interviews",
    },
    {
      icon: Clock,
      iconColor: "text-yellow-400",
      value: pendingFeedback,
      label: "Pending Feedback",
      sublabel: "Awaiting feedback",
    },
  ];

  return (
    <div className="grid p-6 min-h-[120px] grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
};

export default DashboardStats;
