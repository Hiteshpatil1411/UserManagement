import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddUser from "./components/AddUser";
import ViewUsers from "./components/ViewUsers";
import EditUser from "./components/EditUser";
import DashboardHome from "./components/DashboardHome";
import Dashborad from "./components/Dashborad";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";

function App() {
  return (
    <Router>
    <Routes>

      <Route path="/" element={<AdminLogin/>} />
        <Route path="/admin/register" element={<AdminRegister/>} />
        <Route
          path="/dashborad"
          element={
            <ProtectedRoute>
              <Dashborad />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
        <Route path="add" element={<AddUser />} />
        <Route path="view" element={<ViewUsers />} />
        <Route path="edit/:id" element={<EditUser />} />
      </Route>
    </Routes>
    </Router>
  );
}

export default App;
