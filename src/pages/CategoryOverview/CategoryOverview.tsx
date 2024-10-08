import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTransactionContext } from "../../context/TransactionContext";
import Navbar from "../../components/Navbar/Navbar";
import "./CategoryOverview.scss";
import BalanceDisplay from "../../components/BalanceDisplay/BalanceDisplay";

const CategoryOverview: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { transactions } = useTransactionContext();
  const navigate = useNavigate();

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.category === category
  );

  const categoryTotal = filteredTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const handleBackToSummary = () => {
    navigate("/summary");
  };

  return (
    <div className="category-overview-container">
      <Navbar />
      <BalanceDisplay />
      <h2>{category} Transactions</h2>
      <h3>
        Total for {category}: £{categoryTotal.toFixed(2)}
      </h3>

      <ul className="transaction-cat-list">
        {filteredTransactions.map((transaction) => (
          <li key={transaction._id} className="transaction-cat-item">
            <span>{transaction.description}</span>
            <span>£{transaction.amount.toFixed(2)}</span>
            <span>{new Date(transaction.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>

      <button onClick={handleBackToSummary} className="back-button">
        Back to Summary
      </button>
    </div>
  );
};

export default CategoryOverview;
