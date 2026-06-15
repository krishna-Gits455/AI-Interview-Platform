export default function AuthCard({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h1 className="text-2xl font-bold">
        {title}
      </h1>

      {subtitle && (
        <p className="text-slate-400 mt-2">
          {subtitle}
        </p>
      )}

      <div className="mt-6">
        {children}
      </div>

    </div>
  );
}