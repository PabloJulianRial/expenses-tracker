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
        <ul>
          <li>
            <Link to="/transactions" className="dashboard-link">
              Transactions
            </Link>
          </li>
          <li>
            <Link to="/analytics" className="dashboard-link">
              Analytics
            </Link>
          </li>
          <li>
            <Link to="/summary" className="dashboard-link">
              Summary
            </Link>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
