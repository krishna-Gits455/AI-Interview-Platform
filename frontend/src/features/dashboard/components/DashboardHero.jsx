import {
  Plus,
  CalendarDays,
  MessageSquare,
} from "lucide-react";

export default function DashboardHero({
  userName = "Rahul",
  interviewsToday = 2,
  feedbackPending = 1,
  onCreateInterview,
}) {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12)
      return "Good morning";

    if (hour < 17)
      return "Good afternoon";

    return "Good evening";
  };

  return (
    <section
      className="
        relative
        w-full
        min-h-[260px]
        rounded-3xl
        overflow-hidden
        border
        border-slate-800
        bg-gradient-to-br
        from-[#1b1142]
        via-[#13102e]
        to-[#0d1117]
      "
    >
      {/* Background Glow */}

      <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative flex min-h-[260px] items-center justify-between px-10 py-10">

        {/* Left */}

        <div className="max-w-xl">

          <p className="text-sm text-slate-400 mb-2">
            Welcome back
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            {getGreeting()}, {userName} 👋
          </h1>

          <p className="mt-4 max-w-lg text-slate-400 leading-7">
            Manage interviews, collaborate with
            candidates and review AI-generated
            interview reports from one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/40 px-5 py-3">

              <CalendarDays
                size={18}
                className="text-indigo-400"
              />

              <div>

                <p className="text-xs text-slate-400">
                  Today
                </p>

                <p className="text-sm font-medium">
                  {interviewsToday} Interviews
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/40 px-5 py-3">

              <MessageSquare
                size={18}
                className="text-violet-400"
              />

              <div>

                <p className="text-xs text-slate-400">
                  Pending
                </p>

                <p className="text-sm font-medium">
                  {feedbackPending} Feedback
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col items-center gap-6">

          {/* Illustration Placeholder */}

          <div
            className="
              flex
              h-44
              w-72
              items-center
              justify-center
              rounded-3xl
              border
              border-dashed
              border-violet-500/30
              bg-violet-500/5
            "
          >
            <div className="text-center">

              <div className="mb-2 text-6xl">
                👨‍💻
              </div>

              <p className="text-sm text-slate-400">
                Dashboard Illustration
              </p>

            </div>

          </div>

          <button
            onClick={onCreateInterview}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-indigo-600
              px-6
              py-3
              text-sm
              font-medium
              text-white
              transition-all
              hover:bg-indigo-500
              hover:shadow-lg
              hover:shadow-indigo-900/40
            "
          >
            <Plus size={18} />

            Create Interview

          </button>

        </div>

      </div>
    </section>
  );
}