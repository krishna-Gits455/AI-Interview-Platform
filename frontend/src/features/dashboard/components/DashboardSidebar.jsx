import { useEffect, useState } from "react";
import {
  Home,
  Zap,
  UserCircle,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";

const navItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "action-center", label: "Action Center", icon: Zap },
  { id: "created-by-you", label: "Created By You", icon: UserCircle },
  { id: "assigned-to-you", label: "Assigned To You", icon: Users },
  { id: "recent-reports", label: "Recent Reports", icon: FileText },
];

export default function DashboardSidebar({
  activeSection = "overview",
  onSectionChange,
}) {
  const [collapsed, setCollapsed] = useState(() => {
    return (
      localStorage.getItem("dashboard-sidebar") ===
      "collapsed"
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "dashboard-sidebar",
      collapsed ? "collapsed" : "expanded"
    );
  }, [collapsed]);

  const handleSectionClick = (id) => {
    onSectionChange?.(id);

    const section =
      document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <aside
      className={`sticky top-24 self-start flex flex-col bg-[#0d1117] border border-slate-800 rounded-2xl transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-slate-800 min-h-[68px]">
        <div className="shrink-0 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
          <LayoutDashboard
            size={16}
            className="text-white"
          />
        </div>

        {!collapsed && (
          <span className="text-sm font-semibold text-white whitespace-nowrap">
            Dashboard
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-hidden">
        {navItems.map(
          ({ id, label, icon: Icon }) => {
            const active =
              activeSection === id;

            return (
              <button
                key={id}
                onClick={() =>
                  handleSectionClick(id)
                }
                title={
                  collapsed
                    ? label
                    : undefined
                }
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                {!collapsed && (
                  <span className="truncate">
                    {label}
                  </span>
                )}
              </button>
            );
          }
        )}
      </nav>

      {/* Collapse */}
      <button
        onClick={() =>
          setCollapsed((c) => !c)
        }
        className="flex items-center gap-2 px-4 py-4 border-t border-slate-800 text-slate-400 hover:text-white text-sm transition-colors"
      >
        {collapsed ? (
          <ChevronRight size={16} />
        ) : (
          <>
            <ChevronLeft size={16} />
            <span>Collapse</span>
          </>
        )}
      </button>
    </aside>
  );
}