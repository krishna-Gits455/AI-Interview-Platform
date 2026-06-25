import { Users, ExternalLink, MoreHorizontal } from "lucide-react";
import DashboardSectionHeader from "./DashboardSectionHeader";

const statusStyles = {
  Scheduled: "bg-blue-900/30 text-blue-400 border border-blue-700/40",
  "In Progress": "bg-yellow-900/30 text-yellow-400 border border-yellow-700/40",
  Completed: "bg-gray-800 text-gray-400 border border-gray-700/40",
};

const StatusBadge = ({ status }) => (
  <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[status] ?? statusStyles.Completed}`}>
    {status}
  </span>
);

const AssignedToYouTable = ({ interviews = [], onViewAll, onOpen, onMore }) => {
  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-5">
      <DashboardSectionHeader
        icon={Users}
        iconColor="text-blue-400"
        title="Assigned To You"
        subtitle="Interviews where you are the interviewer"
        viewAllLabel="View all"
        onViewAll={onViewAll}
      />

      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-800">
              <th className="text-left pb-3 px-2 font-medium">Interview Title</th>
              <th className="text-left pb-3 px-2 font-medium">Candidate</th>
              <th className="text-left pb-3 px-2 font-medium">Date &amp; Time</th>
              <th className="text-left pb-3 px-2 font-medium">Status</th>
              <th className="text-left pb-3 px-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {interviews.map((interview, idx) => (
              <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                <td className="py-3 px-2 text-white font-medium">{interview.title}</td>
                <td className="py-3 px-2 text-gray-400">{interview.candidate}</td>
                <td className="py-3 px-2 text-gray-400 whitespace-nowrap">{interview.dateTime}</td>
                <td className="py-3 px-2">
                  <StatusBadge status={interview.status} />
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpen?.(interview)}
                      className="text-gray-500 hover:text-gray-300 transition-colors"
                      title="Open"
                    >
                      <ExternalLink size={15} />
                    </button>
                    <button
                      onClick={() => onMore?.(interview)}
                      className="text-gray-500 hover:text-gray-300 transition-colors"
                      title="More"
                    >
                      <MoreHorizontal size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedToYouTable;
