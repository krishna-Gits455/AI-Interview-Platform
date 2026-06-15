export default function Card({
  children,
  className = "",
  ...props
}) {
  return (
    <div
      className={`bg-slate-900 border border-slate-800 rounded-xl p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}