import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Room from "../pages/Room";
import AIInterview from "../pages/AIInterview";
import Report from "../pages/Report";
import DesignSystem from "../pages/DesignSystem";
import ProtectedRoute from "./ProtectedRoute";
import InterviewResult from "../pages/InterviewResult";
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/room/:roomId"
  element={
    <ProtectedRoute>
      <Room />
    </ProtectedRoute>
  }
/>

<Route
  path="/interviews/:id/result"
  element={
    <ProtectedRoute>
      <InterviewResult />
    </ProtectedRoute>
  }
/>

<Route
  path="/ai-interview"
  element={
    <ProtectedRoute>
      <AIInterview />
    </ProtectedRoute>
  }
/>

<Route
  path="/report/:reportId"
  element={
    <ProtectedRoute>
      <Report />
    </ProtectedRoute>
  }
/>
      <Route path="/design-system" element={<DesignSystem />} />

      
    </Routes>
  );
}