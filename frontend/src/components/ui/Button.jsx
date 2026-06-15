const variants = {
  primary:
    "bg-indigo-600 hover:bg-indigo-700 text-white",

  secondary:
    "bg-slate-700 hover:bg-slate-600 text-white",

  danger:
    "bg-red-500 hover:bg-red-600 text-white",

  ghost:
    "bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-800",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        h-11 px-4 rounded-lg
        font-medium
        transition-colors
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}