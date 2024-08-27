// src/pages/Dashboard/Dashboard.tsx

import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.scss";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <div className="dashboard-links">
          <ul>
            <li>
              <Link to="/transactions" className="dashboard-link">
                View Transactions
              </Link>
            </li>
            <li>
              <Link to="/analytics" className="dashboard-link">
                View Analytics
              </Link>
            </li>
            <li>
              <Link to="/categories" className="dashboard-link">
                Manage Categories
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
