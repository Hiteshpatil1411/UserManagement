import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "User",
    status: "Active",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
//hii
    try {
      

      await axios.post("http://localhost:5000/users", user);
      setMessage("✅ User added successfully!");
      setUser({
        name: "",
        email: "",
        phone: "",
        address: "",
        role: "User",
        status: "Active",
        password: "",
      });
    } catch (error) {
      setMessage("❌ Failed to add user. Please try again.",error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="mb-3 text-primary">➕ Add New User</h3>

        {message && (
          <div
            className={`alert ${
              message.includes("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Name */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Email */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            {/* Phone */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>

            {/* Address */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={user.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </div>

            {/* Role */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Role</label>
              <select
                className="form-select"
                name="role"
                value={user.role}
                onChange={handleChange}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Status */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Status</label>
              <select
                className="form-select"
                name="status"
                value={user.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Password */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "⏳ Adding User..." : "✅ Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
