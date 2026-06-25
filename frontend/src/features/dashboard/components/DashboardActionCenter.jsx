import { Zap, Mail, Clock, FileBarChart2, MessageSquare } from "lucide-react";
import ActionCard from "./ActionCard";
import DashboardSectionHeader from "./DashboardSectionHeader";

const typeIconMap = {
  invitation: Mail,
  upcoming: Clock,
  report: FileBarChart2,
  feedback: MessageSquare,
};

const DashboardActionCenter = ({ actions = [], totalCount, onViewAll }) => {
  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-5">
      <DashboardSectionHeader
        icon={Zap}
        iconColor="text-yellow-400"
        title="Action Center"
        subtitle="Items that need your immediate attention"
        viewAllLabel={`View all (${totalCount ?? actions.length})`}
        onViewAll={onViewAll}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {actions.map((action, idx) => (
          <ActionCard
            key={idx}
            type={action.type}
            icon={typeIconMap[action.type]}
            title={action.title}
            subtitle={action.subtitle}
            timestamp={action.timestamp}
            buttonLabel={action.buttonLabel}
            onButtonClick={action.onButtonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardActionCenter;
