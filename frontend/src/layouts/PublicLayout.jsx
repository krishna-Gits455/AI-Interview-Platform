import Navbar from "../components/shared/Navbar";

export default function PublicLayout({
  children,
}) {
  return (
    <div className="min-h-screen text-white bg-slate-950 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-slate-950 to-slate-950" />
  <div className="relative">

      <Navbar />

      <main>
        {children}
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-slate-500">
        InterviewOS
      </footer>

    </div>
    </div>
  );
}