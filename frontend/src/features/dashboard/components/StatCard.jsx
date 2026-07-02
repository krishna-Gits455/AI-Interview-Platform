const StatCard = ({
  icon: Icon,
  iconColor = "text-violet-400",
  value,
  label,
  sublabel,
}) => {
  return (
    <div
      className="
        h-[155px]
        rounded-2xl
        border
        border-slate-800
        bg-[#111827]
        px-8
        py-7
        transition-all
        duration-200
        hover:border-violet-500/30
      "
    >
      {/* Icon */}

      <div
        className={`
          w-14
          h-14
          rounded-2xl
          bg-slate-900
          flex
          items-center
          justify-center
          ${iconColor}
        `}
      >
        <Icon
          size={28}
          strokeWidth={1.8}
        />
      </div>

      {/* Text */}

      <div className="mt-6">

        <h2 className="text-[44px] font-bold leading-none text-white">
          {value}
        </h2>

        <p className="mt-3 text-lg font-semibold text-white">
          {label}
        </p>

        {sublabel && (
          <p className="mt-1 text-sm text-slate-400">
            {sublabel}
          </p>
        )}

      </div>
    </div>
  );
};

export default StatCard;