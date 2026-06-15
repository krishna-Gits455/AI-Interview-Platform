export default function Topbar() {
  return (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6">

      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center">
          R
        </div>

        <span className="text-slate-300">
          Rahul
        </span>
      </div>

    </header>
  );
}