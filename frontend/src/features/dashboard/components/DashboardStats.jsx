import {
  CalendarDays,
  Play,
  CheckCircle2,
  Clock,
} from "lucide-react";

import StatCard from "./StatCard";

export default function DashboardStats({
  stats,
}) {
  const cards = [
    {
      icon: CalendarDays,
      iconColor: "text-violet-400",
      value: stats.scheduled,
      label: "Scheduled",
      sublabel: "Upcoming interviews",
    },
    {
      icon: Play,
      iconColor: "text-blue-400",
      value: stats.inProgress,
      label: "In Progress",
      sublabel: "Ongoing interviews",
    },
    {
      icon: CheckCircle2,
      iconColor: "text-emerald-400",
      value: stats.completed,
      label: "Completed",
      sublabel: "Finished interviews",
    },
    {
      icon: Clock,
      iconColor: "text-yellow-400",
      value: stats.pendingFeedback,
      label: "Pending Feedback",
      sublabel: "Awaiting feedback",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-8 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard
          key={card.label}
          {...card}
        />
      ))}
    </div>
  );
}