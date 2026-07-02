import { useRef } from "react";
import {
  FileText,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

import DashboardSectionHeader from "./DashboardSectionHeader";

const verdictConfig = {
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

function ReportCard({
  report,
  onOpen,
}) {
  const style =
    verdictConfig[
      report.verdict
    ] || verdictConfig.Maybe;

  return (
    <div
      className={`
        flex-shrink-0
        w-[285px]
        h-[165px]
        rounded-2xl
        border
        border-slate-800
        border-t-[3px]
        ${style.accent}
        bg-[#111827]
        p-5
        flex
        flex-col
        transition-all
        duration-200
        hover:border-slate-700
        hover:-translate-y-1
      `}
    >
      <div>
        <h3 className="text-[15px] font-semibold text-white leading-6">
          {report.title}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          By {report.interviewer}
        </p>
      </div>

      <div className="mt-4">

        <span
          className={`
            inline-flex
            rounded-full
            px-3
            py-1
            text-[11px]
            font-medium
            ${style.badge}
          `}
        >
          {report.verdict}
        </span>

        <div
          className={`mt-3 text-3xl font-bold ${style.score}`}
        >
          {report.score}

          <span className="text-lg text-slate-500">
            /10
          </span>

        </div>

      </div>

      <div className="mt-auto flex items-center justify-between">

        <span className="text-xs text-slate-500">
          {report.date}
        </span>

        <button
          onClick={() =>
            onOpen?.(report)
          }
          className="
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-indigo-400
            hover:text-indigo-300
          "
        >
          View

          <ArrowRight size={15} />

        </button>

      </div>

    </div>
  );
}

export default function RecentReportsGrid({
  reports = [],
  onViewAll,
  onOpenReport,
}) {

  const scrollRef = useRef(null);

  const scrollNext = () => {
    scrollRef.current?.scrollBy({
      left: 310,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-800
        bg-[#0d1117]
        p-10
      "
    >
      <DashboardSectionHeader
        icon={FileText}
        iconColor="text-slate-400"
        title="Recent Reports"
        subtitle="AI-generated reports from completed interviews"
        viewAllLabel="View all reports"
        onViewAll={onViewAll}
      />

      <div className="relative mt-10">

        <div
          ref={scrollRef}
          className="
            flex
            gap-6
            overflow-x-auto
            scroll-smooth
            scrollbar-hide
            pr-12
          "
        >
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onOpen={onOpenReport}
            />
          ))}
        </div>

        {reports.length > 4 && (
          <button
            onClick={scrollNext}
            className="
              absolute
              right-0
              top-1/2
              -translate-y-1/2

              w-10
              h-10

              rounded-full

              bg-slate-800
              border
              border-slate-700

              flex
              items-center
              justify-center

              text-slate-300

              hover:bg-indigo-600
              hover:border-indigo-500

              transition
            "
          >
            <ChevronRight size={18} />
          </button>
        )}

      </div>

    </div>
  );
}