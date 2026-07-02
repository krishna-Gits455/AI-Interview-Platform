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
        top-[8.5rem]
        self-start
        shrink-0

        ${
          collapsed
            ? "w-[4.5rem]"
            : "w-80"
        }

        h-[calc(100vh-8.5rem-2rem)]

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

      <div className="border-b border-slate-800 px-7 py-7">

        <div
          className={`flex ${
            collapsed
              ? "justify-center"
              : "items-center gap-4"
          }`}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-900/40">
            <LayoutDashboard
              size={22}
              className="text-white"
            />
          </div>

          {!collapsed && (
            <div>
              <h3 className="text-lg font-semibold text-white">
                Dashboard
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Navigation
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 px-4 py-6">

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
                      : "gap-4 px-5"
                  }

                  py-4

                  rounded-xl

                  text-[15px]
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
                  size={22}
                  strokeWidth={
                    1.8
                  }
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

      {/* Bottom */}

      <div className="mt-auto border-t border-slate-800 p-4">

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
                : "items-center gap-3 px-4"
            }

            py-3.5

            rounded-xl

            text-[15px]

            text-slate-400

            hover:bg-slate-800
            hover:text-white

            transition
          `}
        >
          {collapsed ? (
            <ChevronRight
              size={20}
            />
          ) : (
            <>
              <ChevronLeft
                size={20}
              />
              Collapse
            </>
          )}
        </button>

      </div>

    </aside>
  );
}
