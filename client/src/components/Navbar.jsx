import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout, user } = useAuth();  // get user directly from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">NoteNest</div>

      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn secondary">Register (new user?)</Link>
          </>
        ) : (
          <button className="nav-btn logout" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}
