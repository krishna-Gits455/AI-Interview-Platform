import AppNavbar from "../components/shared/AppNavbar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppNavbar />

      <main className="w-full px-8 py-8">
        {children}
      </main>
    </div>
  );
}