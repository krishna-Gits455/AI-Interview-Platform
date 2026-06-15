export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}

      <input
        className={`
          h-11 px-3
          rounded-lg
          border border-slate-700
          bg-slate-900
          text-white
          outline-none
          focus:border-indigo-500
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}