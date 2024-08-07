import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useTransactionContext } from "../../context/TransactionContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { balance } = useTransactionContext();
  const navigate = useNavigate();

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
        <span>Welcome, {currentUser?.displayName || "User"}</span>
        <span>Balance: ${balance.toFixed(2)}</span>
        <div className="navbar-actions">
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => navigate("/settings")}>
            <i className="settings-icon">⚙️</i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
