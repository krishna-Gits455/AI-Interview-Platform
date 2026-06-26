import { useMemo, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Bell,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Brain,
  FileText,
} from "lucide-react";

import useAuthStore from "../../store/authStore";

export default function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } =
    useAuthStore();

  const [open, setOpen] =
    useState(false);

  const initials = useMemo(() => {
    if (!user?.name) return "U";

    return user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [user]);

  const handleLogout =
    async () => {
      try {
        await logout();
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    };

  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      to: "/dashboard",
      active: location.pathname.startsWith(
        "/dashboard"
      ),
    },
    {
      label: "Reports",
      icon: FileText,
      to: "/reports",
      active:
        location.pathname.startsWith(
          "/report"
        ) ||
        location.pathname.includes(
          "/result"
        ),
    },
    {
      label: "AI Interviews",
      icon: Brain,
      to: "/ai-interview",
      active:
        location.pathname.startsWith(
          "/ai-interview"
        ),
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-lg">

      <div className="h-28 px-10 flex items-center justify-between">

        {/* Logo */}

        <div
          onClick={() =>
            navigate("/dashboard")
          }
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-900/30">
            I
          </div>

          <div>

            <h1 className="font-bold text-lg tracking-tight">
              InterviewOS
            </h1>

            <p className="text-xs text-slate-400">
              AI Interview Platform
            </p>

          </div>

        </div>

        {/* Navigation */}

        <nav className="flex items-center gap-15">

          {navItems.map(
            ({
              label,
              icon: Icon,
              to,
              active,
            }) => (
              <NavLink
                key={label}
                to={to}
                className={`flex items-center gap-2 px-9 py-5 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon size={18} />

                <span className="font-medium">
                  {label}
                </span>
              </NavLink>
            )
          )}

        </nav>

        {/* Right */}

        <div className="flex items-center gap-5">

          <button className="relative p-2 rounded-xl hover:bg-slate-800 transition">

            <Bell
              size={20}
              className="text-slate-300"
            />

            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />

          </button>

          <div className="relative">

            <button
              onClick={() =>
                setOpen(!open)
              }
              className="flex items-center gap-3 rounded-xl hover:bg-slate-800 px-2 py-2 transition"
            >

              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-semibold">

                {initials}

              </div>

              <div className="hidden md:block text-left">

                <p className="font-medium leading-none">
                  {user?.name}
                </p>

                <p className="text-xs text-slate-400">
                  {user?.email}
                </p>

              </div>

              <ChevronDown
                size={18}
                className={`transition-transform ${
                  open
                    ? "rotate-180"
                    : ""
                }`}
              />

            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">

                <button
                  onClick={
                    handleLogout
                  }
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition"
                >

                  <LogOut
                    size={18}
                  />

                  Logout

                </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </header>
  );
}