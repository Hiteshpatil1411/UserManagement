import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ handleLogout }) {
  return (
    <div className="d-flex flex-column bg-gradient-to-b from-indigo-900 to-indigo-700 text-white  p-3" style={{ width: "250px", minHeight: "100vh", borderRadius: "0 20px 20px 0" }}>
      {/* Logo / Brand */}
      <div className="text-center mb-5">
        <h3 className="fw-bold">⚡ Admin Hub</h3>
        <p className="text-white-50 small">Manage your store</p>
        <hr className="border-light" />
      </div>

      {/* Navigation */}
      <ul className="nav flex-column mb-auto">
        <li className="mb-3">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `nav-link d-flex align-items-center py-2 px-3 rounded-pill transition ${
                isActive ? "bg-white text-indigo-800 fw-bold" : "text-white hover:bg-indigo-500 hover:text-white"
              }`
            }
          >
            <i className="fas fa-tachometer-alt me-2"></i> Dashboard Home
          </NavLink>
        </li>
        <li className="mb-3">
          <NavLink
            to="add"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center py-2 px-3 rounded-pill transition ${
                isActive ? "bg-white text-indigo-800 fw-bold" : "text-white hover:bg-indigo-500 hover:text-white"
              }`
            }
          >
            <i className="fas fa-plus-circle me-2"></i> Add User
          </NavLink>
        </li>
        <li className="mb-3">
          <NavLink
            to="view"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center py-2 px-3 rounded-pill transition ${
                isActive ? "bg-white text-indigo-800 fw-bold" : "text-white hover:bg-indigo-500 hover:text-white"
              }`
            }
          >
            <i className="fas fa-box-open me-2"></i> View Users
          </NavLink>
        </li>
      </ul>

      {/* Spacer */}
      <div className="mt-auto pt-4">
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger w-100 rounded-pill d-flex align-items-center justify-content-center fw-bold"
        >
          <i className="fas fa-sign-out-alt me-2"></i> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
