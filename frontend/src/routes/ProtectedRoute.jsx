import { Navigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

export default function ProtectedRoute({
  children,
}) {
  const {
    isAuthenticated,
    isLoading,
  } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}