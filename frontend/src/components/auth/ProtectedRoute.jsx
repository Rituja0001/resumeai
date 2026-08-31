import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-['Plus_Jakarta_Sans']">
        <div className="w-10 h-10 border-4 border-[#FA0C40]/20 border-t-[#FA0C40] rounded-full animate-spin mb-4" />
        <p className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
          Loading session…
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

