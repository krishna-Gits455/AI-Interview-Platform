import { FileText, ExternalLink, ChevronRight } from "lucide-react";
import DashboardSectionHeader from "./DashboardSectionHeader";

const verdictStyles = {
  Hire: "bg-green-900/40 text-green-400 border border-green-700/40",
  Maybe: "bg-yellow-900/40 text-yellow-400 border border-yellow-700/40",
  "Not Hire": "bg-red-900/40 text-red-400 border border-red-700/40",
};

const verdictBorderAccent = {
  Hire: "border-t-green-500",
  Maybe: "border-t-yellow-500",
  "Not Hire": "border-t-red-500",
};

const ReportCard = ({ report, onOpen }) => {
  const borderAccent = verdictBorderAccent[report.verdict] ?? "border-t-gray-600";
  const score = parseFloat(report.score);
  const scoreColor =
    score >= 8 ? "text-green-400" : score >= 6 ? "text-yellow-400" : "text-red-400";

  return (
    <div
      className={`bg-[#111827] border border-gray-800 border-t-2 ${borderAccent} rounded-xl p-4 flex flex-col gap-3 min-w-[200px] flex-1`}
    >
      <div>
        <h3 className="text-sm font-semibold text-white leading-snug">{report.title}</h3>
        <p className="text-xs text-gray-500 mt-1">By: {report.interviewer} (Interviewer)</p>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
            verdictStyles[report.verdict] ?? verdictStyles.Maybe
          }`}
        >
          {report.verdict}
        </span>
        <span className={`text-lg font-bold ${scoreColor}`}>
          {report.score}
          <span className="text-xs text-gray-500 font-normal">/10</span>
        </span>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-gray-600">{report.date}</span>
        <button
          onClick={() => onOpen?.(report)}
          className="text-gray-500 hover:text-gray-300 transition-colors"
          title="Open report"
        >
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};

const RecentReportsGrid = ({ reports = [], onViewAll, onOpenReport }) => {
  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-5">
      <DashboardSectionHeader
        icon={FileText}
        iconColor="text-gray-400"
        title="Recent Reports"
        subtitle="Reports from your recent interviews as a candidate"
        viewAllLabel="View all reports"
        onViewAll={onViewAll}
      />

      <div className="relative">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700">
          {reports.map((report, idx) => (
            <ReportCard key={idx} report={report} onOpen={onOpenReport} />
          ))}
        </div>

        {reports.length > 3 && (
          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 shadow-lg transition-colors">
            <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default RecentReportsGrid;
