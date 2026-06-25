const StatCard = ({ icon: Icon, iconColor = "text-purple-400", value, label, sublabel }) => {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 flex items-center gap-4 flex-1 min-w-0">
      <div className={`shrink-0 ${iconColor}`}>
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <div className="min-w-0">
        <div className="text-3xl font-bold text-white leading-tight">{value}</div>
        <div className="text-sm font-medium text-white mt-0.5">{label}</div>
        {sublabel && <div className="text-xs text-gray-500 mt-0.5">{sublabel}</div>}
      </div>
    </div>
  );
};

export default StatCard;
