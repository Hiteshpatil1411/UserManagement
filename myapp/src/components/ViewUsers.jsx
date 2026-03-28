import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch all users
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("❌ Failed to load users");
        setLoading(false);
      });
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch {
      setMessage("❌ Failed to delete user");
    }
  };

  return (
    <div className="container mt-5">
        <div className="card shadow p-4">
      <h3 className="mb-4  text-info fw-bold">👥 Manage Users</h3>

      {message && (
        <div className={`alert ${message.includes("❌") ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-info"></div>
          <p className="mt-2">Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <p className="text-warning fw-bold">🚫 No users found</p>
      ) : (
        <div
          className="table-responsive shadow-lg rounded-4 p-3"
        
        >
          <table className="table table-hover align-middle text-light mb-0">
            <thead style={{ background: "#2c2c3a" }}>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} className="align-middle">
                  <td>{i + 1}</td>
                  <td className="fw-semibold">{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.address}</td>
                  <td>
                    <span
                      className={`badge ${
                        u.role === "Admin"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                      style={{ fontSize: "0.85rem" }}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        u.status === "Active"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                      style={{ fontSize: "0.85rem" }}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="d-flex gap-2">
                    <Link
                      to={`/dashborad/edit/${u.id}`}
                      className="btn btn-sm btn-outline-warning"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(u.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
};

export default ViewUsers;
