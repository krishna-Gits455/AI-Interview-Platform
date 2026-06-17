import {
  LayoutDashboard,
  Brain,
  FileText,
  LogOut,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import useAuthStore from "../../store/authStore";

export default function Sidebar() {

  const navigate = useNavigate();

const logout =
  useAuthStore(
    (state) => state.logout
  );

const handleLogout =
  async () => {
    try {
      await logout();

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className="w-72 border-r border-slate-800 flex flex-col">

      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h2 className="font-bold text-xl">
          InterviewOS
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/ai-interview"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800"
        >
          <Brain size={18} />
          AI Practice
        </Link>

        <Link
          to="/reports"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800"
        >
          <FileText size={18} />
          Reports
        </Link>

        
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
  onClick={handleLogout}
  className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-slate-800"
>
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
}