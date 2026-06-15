import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Room from "../pages/Room";
import AIInterview from "../pages/AIInterview";
import Report from "../pages/Report";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/room/:roomId" element={<Room />} />
      <Route path="/ai-interview" element={<AIInterview />} />
      <Route path="/report/:reportId" element={<Report />} />
    </Routes>
  );
}