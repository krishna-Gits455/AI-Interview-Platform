import Sidebar from "../components/shared/Sidebar";
import Topbar from "../components/shared/Topbar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        
        <main className="p-8 max-w-[1600px] w-full">
          {children}
        </main>
      </div>
    </div>
  );
}