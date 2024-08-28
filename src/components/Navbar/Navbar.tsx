import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/dashboard" className="navbar-link">
            Dashboard
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/transactions" className="navbar-link">
            Transactions
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/analytics" className="navbar-link">
            Analytics
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/summary" className="navbar-link">
            Summary
          </Link>{" "}
        </li>
        <li className="navbar-item">
          <Link to="/settings" className="navbar-link">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
