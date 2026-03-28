// src/Coms/admin/Dashboard.js
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin");
  };

  return (
    <div className="d-flex vh-100 bg-dark text-white">
      {/* Sidebar */}
      <Sidebar handleLogout={handleLogout} />

      {/* Main content */}
      <div className="flex-grow-1 p-4 overflow-auto">
        <Outlet /> {/* Render child routes */}
      </div>
    </div>
  );
};

export default Dashboard;
