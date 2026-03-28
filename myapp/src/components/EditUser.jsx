import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "User",
    status: "Active",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch user data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("❌ Failed to load user data");
        setLoading(false);
      });
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.put(`http://localhost:5000/users/${id}`, user);
      setMessage("✅ User updated successfully!");
      setTimeout(() => navigate("/dashboard/view-users"), 1500);
    } catch (error) {
      setMessage("❌ Failed to update user.",error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="mb-3 text-warning">✏️ Edit User</h3> 
        //NEW COMMENT
        {message && (
          <div
            className={`alert ${
              message.includes("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-warning"></div>
            <p>Loading user data...</p>
          </div>
        ) : (
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
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-warning w-100">
              ✅ Update User
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUser;
