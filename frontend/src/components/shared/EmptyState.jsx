export default function EmptyState({
  title,
  description,
}) {
  return (
    <div className="text-center py-10">
      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="text-slate-400 mt-2">
        {description}
      </p>
    </div>
  );
}