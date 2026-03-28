import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (adminPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
       await axios.post("http://localhost:5000/admin", {
        adminEmail,
        adminPassword,
      });

      
      setTimeout(() => navigate("/"), 1500); // redirect to login after success
    } catch (error) {
      setMessage("Registration failed",error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <div className="text-center mb-4">
          <i className="fas fa-user-plus fa-3x text-success"></i>
          <h3 className="mt-2 fw-bold">Admin Registration</h3>
          <p className="text-muted">Create a new admin account</p>
        </div>

        {message && (
          <div
            className={`alert ${
              message.includes("success") || message.includes("Success")
                ? "alert-success"
                : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter admin email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? (
              <span>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="small">
            Already have an account?{" "}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-success fw-bold" : "text-decoration-none"
              }
            >
              Login here
            </NavLink>
          </p>
          <small className="text-muted">
            © {new Date().getFullYear()} E-Com Admin Panel
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
