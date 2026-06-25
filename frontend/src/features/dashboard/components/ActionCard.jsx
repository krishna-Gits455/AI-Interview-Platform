const typeStyles = {
  invitation: {
    label: "Invitation Received",
    labelColor: "text-pink-400",
    borderColor: "border-pink-500/30",
    btnClass: "bg-purple-600 hover:bg-purple-700 text-white",
  },
  upcoming: {
    label: "Starts in 30 min",
    labelColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    btnClass: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  report: {
    label: "AI Report Ready",
    labelColor: "text-yellow-400",
    borderColor: "border-yellow-500/30",
    btnClass: "bg-yellow-500 hover:bg-yellow-600 text-black font-semibold",
  },
  feedback: {
    label: "Feedback Pending",
    labelColor: "text-green-400",
    borderColor: "border-green-500/30",
    btnClass: "bg-green-600 hover:bg-green-700 text-white",
  },
};

const ActionCard = ({
  type = "invitation",
  icon: Icon,
  title,
  subtitle,
  timestamp,
  buttonLabel,
  onButtonClick,
}) => {
  const style = typeStyles[type] || typeStyles.invitation;

  return (
    <div
      className={`bg-[#111827] border ${style.borderColor} rounded-xl p-6 min-h-[120px] flex flex-col gap-3 min-w-0 flex-1`}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} className={style.labelColor} />}
        <span className={`text-xs font-semibold ${style.labelColor}`}>{style.label}</span>
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-white leading-snug">{title}</p>
        {subtitle && <p className="text-sm text-gray-400 leading-snug">{subtitle}</p>}
      </div>

      {timestamp && (
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span>🕐</span>
          <span>{timestamp}</span>
        </div>
      )}

      <button
        onClick={onButtonClick}
        className={`mt-auto w-full py-2 rounded-lg text-sm transition-colors ${style.btnClass}`}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default ActionCard;
