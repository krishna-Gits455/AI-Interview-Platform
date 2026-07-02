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

const thClass =
  "px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 first:pl-8 last:pr-8";

const tdClass =
  "px-6 py-7 align-middle first:pl-8 last:pr-8";

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
    <section className="rounded-3xl border border-slate-800 bg-[#0d1117] p-10">

      <DashboardSectionHeader
        icon={Users}
        iconColor="text-blue-400"
        title="Assigned To You"
        subtitle="Interviews assigned to you."
        viewAllLabel="View all"
        onViewAll={onViewAll}
      />

      <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-800/70">

        <table className="w-full min-w-[720px] border-collapse">

          <thead>

            <tr className="border-b border-slate-700/80 bg-slate-900/40">

              <th className={`${thClass} w-[28%]`}>
                Interview
              </th>

              <th className={`${thClass} w-[22%]`}>
                Interviewer
              </th>

              <th className={`${thClass} w-[22%]`}>
                Date
              </th>

              <th className={`${thClass} w-[14%]`}>
                Status
              </th>

              <th className={`${thClass} w-[14%] text-right`}>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {interviews.map((interview) => (

              <tr
                key={interview.id}
                className="border-b border-slate-800/50 last:border-b-0 hover:bg-slate-800/20 transition-colors"
              >

                <td className={tdClass}>

                  <div className="text-[15px] font-semibold leading-snug text-white">
                    {interview.title}
                  </div>

                </td>

                <td className={`${tdClass} text-sm text-slate-400`}>
                  {interview.interviewer}
                </td>

                <td className={`${tdClass} text-sm text-slate-500 whitespace-nowrap`}>
                  {interview.dateTime}
                </td>

                <td className={tdClass}>

                  <StatusBadge
                    status={interview.status}
                  />

                </td>

                <td className={tdClass}>

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
