import { useState } from "react";
import {
  Home,
  Zap,
  UserCircle,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  Code2,
} from "lucide-react";

const navItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "action-center", label: "Action Center", icon: Zap },
  { id: "created-by-you", label: "Created By You", icon: UserCircle },
  { id: "assigned-to-you", label: "Assigned To You", icon: Users },
  { id: "recent-reports", label: "Recent Reports", icon: FileText },
];

const DashboardSidebar = ({ activeSection = "overview", onSectionChange }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex flex-col bg-[#0d1117] border-r border-gray-800 h-full transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-gray-800 min-h-[64px]">
        <div className="shrink-0 w-7 h-7 bg-purple-600 rounded-md flex items-center justify-center">
          <Code2 size={14} className="text-white" />
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold text-white whitespace-nowrap">
            AI Interview Platform
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-hidden">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => onSectionChange?.(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-purple-600/20 text-purple-400"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} strokeWidth={1.8} className="shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center gap-2 px-4 py-4 border-t border-gray-800 text-gray-400 hover:text-white text-xs transition-colors"
        title={collapsed ? "Expand" : "Collapse"}
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
};

export default DashboardSidebar;
