import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
  import {toast } from 'react-toastify';
  import { useAuth } from "../context/AuthContext";


export default function Navbar() {
  const {logout, user}= useAuth()
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!user); // true if user exists
  }, [localStorage.getItem("event-noter-user")]);

  const handleLogout = () => {
    logout();
    toast.info("Logged out")
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">NoteNest</div>

      <div className="navbar-right">
        {!isLoggedIn ? (
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
