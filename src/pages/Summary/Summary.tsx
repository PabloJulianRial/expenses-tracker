import React from "react";
import { Link } from "react-router-dom";
import { useTransactionContext } from "../../context/TransactionContext";
import Navbar from "../../components/Navbar/Navbar";
import "./Summary.scss";

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

  return (
    <div className="summary-container">
      <Navbar />
      <h2>Summary</h2>
      <ul className="category-list">
        {Object.entries(categoryTotals).map(([category, total]) => (
          <li key={category} className="category-sum-item">
            <Link to={`/category/${category}`}>
              <span className="category-name">{category}</span>
              <span className="category-total">£{(total || 0).toFixed(2)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
