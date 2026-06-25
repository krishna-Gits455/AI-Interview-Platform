import { ArrowRight } from "lucide-react";

const DashboardSectionHeader = ({ icon: Icon, iconColor = "text-purple-400", title, subtitle, viewAllLabel, onViewAll, badge }) => {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`${iconColor}`}>
            <Icon size={20} strokeWidth={1.5} />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-white">{title}</h2>
            {badge !== undefined && (
              <span className="text-xs text-gray-400">({badge})</span>
            )}
          </div>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {(viewAllLabel || onViewAll) && (
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors shrink-0"
        >
          {viewAllLabel || "View all"}
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
};

export default DashboardSectionHeader;
