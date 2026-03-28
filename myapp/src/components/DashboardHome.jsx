import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardHome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [latestUsers, setLatestUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setTotalUsers(res.data.length);

      // Count admins
      setTotalAdmins(res.data.filter((u) => u.role === "Admin").length);

      // Show latest 3 users
      setLatestUsers(res.data.slice(-3).reverse());
    });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">📊 User Management Dashboard</h2>

      {/* Summary cards */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card text-center shadow p-3">
            <h4>Total Users</h4>
            <h2 className="text-primary">{totalUsers}</h2>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-center shadow p-3">
            <h4>Total Admins</h4>
            <h2 className="text-danger">{totalAdmins}</h2>
          </div>
        </div>
      </div>

      {/* Latest Users */}
      <h4 className="mb-3">🆕 Latest Registered Users</h4>
      <div className="row">
        {latestUsers.map((u) => (
          <div key={u.id} className="col-md-4 mb-3">
            <div className="card shadow p-3">
              <h5>{u.name}</h5>
              <p>{u.email}</p>
              <span
                className={`badge ${
                  u.role === "Admin" ? "bg-danger" : "bg-secondary"
                }`}
              >
                {u.role}
              </span>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
