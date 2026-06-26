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
  {
    id: "overview",
    label: "Overview",
    icon: Home,
  },
  {
    id: "actions",
    label: "Action Center",
    icon: Zap,
  },
  {
    id: "created",
    label: "Created By You",
    icon: UserCircle,
  },
  {
    id: "assigned",
    label: "Assigned To You",
    icon: Users,
  },
  {
    id: "reports",
    label: "Recent Reports",
    icon: FileText,
  },
];

export default function DashboardSidebar({
  activeSection = "overview",
  onSectionChange,
}) {
  const [collapsed, setCollapsed] =
    useState(() => {
      return (
        localStorage.getItem(
          "dashboard-sidebar"
        ) === "collapsed"
      );
    });

  useEffect(() => {
    localStorage.setItem(
      "dashboard-sidebar",
      collapsed
        ? "collapsed"
        : "expanded"
    );
  }, [collapsed]);

  const handleSectionClick = (id) => {
    onSectionChange?.(id);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <aside
      className={`
        sticky
        top-24
        self-start

        ${
          collapsed
            ? "w-20"
            : "w-72"
        }

        h-[calc(100vh-7rem)]

        rounded-3xl
        border
        border-slate-800

        bg-[#0d1117]

        flex
        flex-col

        transition-all
        duration-300
      `}
    >
      {/* Header */}

      <div className="border-b border-slate-800 px-6 py-6">

        <div
          className={`flex ${
            collapsed
              ? "justify-center"
              : "items-center gap-3"
          }`}
        >
          <div className="h-11 w-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/40">
            <LayoutDashboard
              size={20}
              className="text-white"
            />
          </div>

          {!collapsed && (
            <div>
              <h3 className="text-base font-semibold text-white">
                Dashboard
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Navigation
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-3 py-5 space-y-2">

        {navItems.map(
          ({
            id,
            label,
            icon: Icon,
          }) => {
            const active =
              activeSection === id;

            return (
              <button
                key={id}
                onClick={() =>
                  handleSectionClick(
                    id
                  )
                }
                title={
                  collapsed
                    ? label
                    : undefined
                }
                className={`
                  w-full
                  flex
                  items-center

                  ${
                    collapsed
                      ? "justify-center px-0"
                      : "gap-4 px-4"
                  }

                  py-3.5

                  rounded-xl

                  text-sm
                  font-medium

                  transition-all
                  duration-200

                  ${
                    active
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <Icon
                  size={20}
                  strokeWidth={
                    1.8
                  }
                />

                {!collapsed && (
                  <span>
                    {label}
                  </span>
                )}
              </button>
            );
          }
        )}

      </nav>

      {/* Bottom */}

      <div className="mt-auto border-t border-slate-800 p-3">

        <button
          onClick={() =>
            setCollapsed(
              !collapsed
            )
          }
          className={`
            w-full

            flex

            ${
              collapsed
                ? "justify-center"
                : "items-center gap-3 px-3"
            }

            py-3

            rounded-xl

            text-sm

            text-slate-400

            hover:bg-slate-800
            hover:text-white

            transition
          `}
        >
          {collapsed ? (
            <ChevronRight
              size={18}
            />
          ) : (
            <>
              <ChevronLeft
                size={18}
              />
              Collapse
            </>
          )}
        </button>

      </div>

    </aside>
  );
}