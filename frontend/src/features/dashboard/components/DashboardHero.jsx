import { Plus, CalendarDays, MessageSquare } from "lucide-react";

const DashboardHero = ({
  userName = "Rahul",
  interviewsToday = 2,
  feedbackPending = 1,
  onCreateInterview,
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div
  className="
  relative
  min-h-[220px]
  bg-gradient-to-br
  from-[#1a1040]
  via-[#130d35]
  to-[#0d1117]
  rounded-2xl
  overflow-hidden
  p-8
  pr-56
  border
  border-purple-900/30
"
>
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Left content */}
      <div className="relative z-10 flex-1 min-w-0">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
          {getGreeting()}, {userName} 👋
        </h1>
        <p className="text-gray-400 text-sm mb-5">
          Here's what's happening with your interviews today.
        </p>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-black/30 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300">
            <CalendarDays size={15} className="text-purple-400" />
            <span>{interviewsToday} interviews today</span>
          </div>
          <div className="flex items-center gap-2 bg-black/30 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300">
            <MessageSquare size={15} className="text-blue-400" />
            <span>{feedbackPending} feedback pending</span>
          </div>
        </div>
      </div>

      {/* Illustration placeholder */}
      <div className="relative z-10 hidden md:flex flex-col items-center justify-center">
        <div className="w-36 h-28 rounded-2xl bg-purple-900/30 border border-purple-700/30 flex items-center justify-center">
          {/* Decorative SVG illustration placeholder */}
          <svg viewBox="0 0 120 96" className="w-28 h-24 opacity-80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Monitor */}
            <rect x="20" y="10" width="80" height="52" rx="6" fill="#4c1d95" opacity="0.6" />
            <rect x="24" y="14" width="72" height="44" rx="4" fill="#1e1b4b" />
            {/* Screen glow lines */}
            <rect x="30" y="22" width="40" height="3" rx="1.5" fill="#7c3aed" opacity="0.7" />
            <rect x="30" y="30" width="28" height="3" rx="1.5" fill="#6d28d9" opacity="0.5" />
            <rect x="30" y="38" width="34" height="3" rx="1.5" fill="#5b21b6" opacity="0.4" />
            {/* Chart bar */}
            <rect x="74" y="32" width="8" height="14" rx="2" fill="#7c3aed" opacity="0.8" />
            <rect x="84" y="26" width="8" height="20" rx="2" fill="#a78bfa" opacity="0.8" />
            {/* Stand */}
            <rect x="54" y="62" width="12" height="8" rx="2" fill="#4c1d95" opacity="0.5" />
            <rect x="44" y="70" width="32" height="4" rx="2" fill="#4c1d95" opacity="0.4" />
            {/* Person silhouette */}
            <circle cx="90" cy="30" r="8" fill="#7c3aed" opacity="0.4" />
            <path d="M78 68 Q90 55 102 68" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Create Interview button — top right */}
      <button
        onClick={onCreateInterview}
        className="absolute top-5 right-5 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-lg shadow-purple-900/40"
      >
        <Plus size={16} />
        Create Interview
      </button>
    </div>
  );
};

export default DashboardHero;
