import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link
          to="/"
          className="font-bold text-xl text-white"
        >
          InterviewOS
        </Link>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="text-slate-300 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="text-slate-300 hover:text-white"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}