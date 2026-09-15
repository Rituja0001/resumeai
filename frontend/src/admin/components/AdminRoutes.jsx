import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminAuthenticated } from "../services/adminApi";

export default function AdminRoutes() {
  const isAuth = isAdminAuthenticated();

  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

