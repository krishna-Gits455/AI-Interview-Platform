const variants = {
  default:
    "bg-slate-700 text-white",

  success:
    "bg-emerald-500 text-white",

  warning:
    "bg-yellow-500 text-black",

  danger:
    "bg-red-500 text-white",
};

export default function Badge({
  children,
  variant = "default",
}) {
  return (
    <span
      className={`
        px-2 py-1
        rounded-md
        text-xs
        font-medium
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}