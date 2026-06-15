export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`p-6 rounded-xl border border-slate-800 bg-slate-900 ${className}`}
    >
      {children}
    </div>
  );
}