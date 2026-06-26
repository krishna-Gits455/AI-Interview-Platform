import {
  Users,
  Play,
  FileText,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DashboardSectionHeader from "./DashboardSectionHeader";

const statusStyles = {
  Scheduled:
    "bg-blue-500/15 text-blue-400 border border-blue-500/30",

  "In Progress":
    "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",

  Completed:
    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
      statusStyles[status] ?? statusStyles.Completed
    }`}
  >
    {status}
  </span>
);

export default function AssignedToYouTable({
  interviews = [],
  onViewAll,
}) {
  const navigate = useNavigate();

  return (
    <section className="rounded-3xl border border-slate-800 bg-[#0d1117] p-8">

      <DashboardSectionHeader
        icon={Users}
        iconColor="text-blue-400"
        title="Assigned To You"
        subtitle="Interviews assigned to you."
        viewAllLabel="View all"
        onViewAll={onViewAll}
      />

      <div className="mt-8 overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-800">

              <th className="pb-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Interview
              </th>

              <th className="pb-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Interviewer
              </th>

              <th className="pb-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Date
              </th>

              <th className="pb-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="pb-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {interviews.map((interview) => (

              <tr
                key={interview.id}
                className="border-b border-slate-800/60 hover:bg-slate-800/20 transition"
              >

                <td className="py-6">

                  <div className="font-medium text-white">
                    {interview.title}
                  </div>

                </td>

                <td className="py-6 text-slate-400">
                  {interview.interviewer}
                </td>

                <td className="py-6 text-slate-400 whitespace-nowrap">
                  {interview.dateTime}
                </td>

                <td className="py-6">

                  <StatusBadge
                    status={interview.status}
                  />

                </td>

                <td className="py-6">

                  <div className="flex justify-end">

                    {interview.status === "Completed" ? (

                      <button
                        onClick={() =>
                          navigate(
                            `/interviews/${interview.id}/result`
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:border-slate-600 hover:bg-slate-800 transition"
                      >
                        <FileText size={16} />
                        View Report
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          navigate(
                            `/room/${interview.id}`
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition"
                      >
                        <Play size={16} />

                        {interview.status ===
                        "In Progress"
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
  );
}