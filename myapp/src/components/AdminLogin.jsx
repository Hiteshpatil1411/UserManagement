import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // ✅ use t

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");
// new comment
  try {
    const res = await axios.get(
      `http://localhost:5000/admin?adminEmail=${adminEmail}&adminPassword=${adminPassword}`
    );
    console.log(res.data)

    if (res.data.length > 0) {
      setMessage("✅ Login Successful");
      localStorage.setItem("isAuthenticated", true);
       // save login
       console.log("Login successful, redirecting...");
      navigate("/dashborad"); // redirect
    } else {
      setMessage("❌ Invalid email or password");
    }
  } catch (error) {
    setMessage("❌ Login failed (server error)");
    console.log(error)
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <div className="text-center mb-4">
          <i className="fas fa-user-shield fa-3x text-primary"></i>
          <h3 className="mt-2 fw-bold">Admin Login</h3>
          <p className="text-muted">Access the portfolio dashboard</p>
        </div>

        {message && (
          <div
            className={`alert ${
              message.includes("Success") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
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

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <span>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            © {new Date().getFullYear()} E-Com Admin Panel
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
