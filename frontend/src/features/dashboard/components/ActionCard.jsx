import {
  Clock,
  Mail,
  FileBarChart2,
  MessageSquare,
} from "lucide-react";

const typeStyles = {
  invitation: {
    label: "Invitation Received",
    labelColor: "text-fuchsia-400",
    borderColor: "border-fuchsia-500/30",
    button: "bg-violet-600 hover:bg-violet-500 text-white",
  },

  upcoming: {
    label: "Starts in 30 min",
    labelColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    button: "bg-blue-600 hover:bg-blue-500 text-white",
  },

  report: {
    label: "AI Report Ready",
    labelColor: "text-yellow-400",
    borderColor: "border-yellow-500/30",
    button: "bg-yellow-500 hover:bg-yellow-400 text-black font-semibold",
  },

  feedback: {
    label: "Feedback Pending",
    labelColor: "text-green-400",
    borderColor: "border-green-500/30",
    button: "bg-green-600 hover:bg-green-500 text-white",
  },
};

export default function ActionCard({
  type = "invitation",
  icon: Icon,
  title,
  subtitle,
  timestamp,
  buttonLabel,
  onButtonClick,
}) {
  const style = typeStyles[type];

  return (
    <div
      className={`
        h-[230px]
        rounded-2xl
        border
        ${style.borderColor}
        bg-[#111827]
        p-6

        flex
        flex-col

        transition-all
        duration-200

        hover:-translate-y-1
      `}
    >
      {/* Header */}

      <div className="flex items-center gap-3">

        {Icon && (
          <Icon
            size={22}
            className={style.labelColor}
          />
        )}

        <span
          className={`font-semibold text-base ${style.labelColor}`}
        >
          {style.label}
        </span>

      </div>

      {/* Body */}

      <div className="mt-6">

        <h3 className="text-2xl font-semibold leading-snug text-white">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-2 text-lg leading-7 text-slate-400">
            {subtitle}
          </p>
        )}

      </div>

      {/* Time */}

      {timestamp && (
        <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
          <Clock size={15} />
          {timestamp}
        </div>
      )}

      {/* Button */}

      <button
        onClick={onButtonClick}
        className={`
          mt-auto
          h-12
          rounded-xl
          text-base
          font-semibold
          transition-all
          ${style.button}
        `}
      >
        {buttonLabel}
      </button>
    </div>
  );
}