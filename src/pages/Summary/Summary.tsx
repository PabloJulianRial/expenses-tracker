import React from "react";
import { Link } from "react-router-dom";
import { useTransactionContext } from "../../context/TransactionContext";
import Navbar from "../../components/Navbar/Navbar";
import "./Summary.scss";
import BalanceDisplay from "../../components/BalanceDisplay/BalanceDisplay";

const Summary: React.FC = () => {
  const { transactions } = useTransactionContext();

  const categoryTotals = transactions.reduce(
    (acc: Record<string, number>, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += transaction.amount;
      return acc;
    },
    {}
  );

  const monthlyTotals = transactions.reduce(
    (acc: Record<string, number>, transaction) => {
      const month = new Date(transaction.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += transaction.amount;
      return acc;
    },
    {}
  );

  return (
    <div className="summary-container">
      <Navbar />
      <BalanceDisplay />
      <h2>Summary</h2>

      <div className="summary-section">
        <h3>Expenses by Category</h3>
        <ul className="category-list">
          {Object.entries(categoryTotals).map(([category, total]) => (
            <li key={category} className="category-sum-item">
              <Link to={`/category/${category}`}>
                <span className="category-name">{category}</span>
                <span className="category-total">
                  £{(total || 0).toFixed(2)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="summary-section">
        <h3>Expenses by Month</h3>
        <ul className="monthly-list">
          {Object.entries(monthlyTotals).map(([month, total]) => (
            <li key={month} className="monthly-sum-item">
              <Link to={`/month/${month}`}>
                <span className="month-name">{month}</span>
                <span className="month-total">£{(total || 0).toFixed(2)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Summary;
