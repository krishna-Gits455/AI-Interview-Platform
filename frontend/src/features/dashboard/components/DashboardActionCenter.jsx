import {
  Zap,
  Mail,
  Clock,
  FileBarChart2,
  MessageSquare,
} from "lucide-react";

import ActionCard from "./ActionCard";
import DashboardSectionHeader from "./DashboardSectionHeader";

const typeIconMap = {
  invitation: Mail,
  upcoming: Clock,
  report: FileBarChart2,
  feedback: MessageSquare,
};

export default function DashboardActionCenter({
  actions = [],
  totalCount,
  onViewAll,
}) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-800
        bg-[#0d1117]
        p-8
      "
    >
      <DashboardSectionHeader
        icon={Zap}
        iconColor="text-yellow-400"
        title="Action Center"
        subtitle="Items that need your immediate attention"
        viewAllLabel={`View all (${totalCount ?? actions.length})`}
        onViewAll={onViewAll}
      />

      <div
        className="
          mt-8
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        {actions.length ? (
          actions.map((action) => (
            <ActionCard
              key={action.id}
              type={action.type}
              icon={typeIconMap[action.type]}
              title={action.title}
              subtitle={action.subtitle}
              timestamp={action.timestamp}
              buttonLabel={action.buttonLabel}
              onButtonClick={action.onButtonClick}
            />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center rounded-2xl border border-dashed border-slate-700 py-14 text-slate-500">
            You're all caught up 🎉
          </div>
        )}
      </div>
    </section>
  );
}