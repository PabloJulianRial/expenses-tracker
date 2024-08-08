import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {location.pathname !== "/dashboard" && (
          <button className="nav-button" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        )}
        <button className="nav-button" onClick={handleLogout}>
          Logout
        </button>
        <button className="nav-button" onClick={() => navigate("/settings")}>
          <i className="settings-icon">⚙️</i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
