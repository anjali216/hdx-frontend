import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ named import, not default

const Sidebar = () => {
  const token = localStorage.getItem("token");
  let role = "";

  if (token) {
    try {
      role = jwtDecode(token).role;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return (
    <div className="sidebar">
      <Link to="/dashboard">Dashboard</Link>

      {role === "Admin" && <Link to="/employees">Employees</Link>}
      {(role === "Admin" || role === "Manager") && (
        <Link to="/projects">Projects</Link>
      )}

      <Link to="/tasks">Tasks</Link>
    </div>
  );
};

export default Sidebar;