import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTransactionContext } from "../../context/TransactionContext";
import Navbar from "../../components/Navbar/Navbar";
import "./MonthOverview.scss";
import BalanceDisplay from "../../components/BalanceDisplay/BalanceDisplay";

const MonthOverview: React.FC = () => {
  const { month } = useParams<{ month: string }>();
  const { transactions } = useTransactionContext();
  const navigate = useNavigate();

  const filteredTransactions = transactions.filter(
    (transaction) =>
      new Date(transaction.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      }) === month
  );

  const monthTotal = filteredTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const handleBackToSummary = () => {
    navigate("/summary");
  };

  const formattedMonth = month
    ? month.charAt(0).toUpperCase() + month.slice(1)
    : "";

  return (
    <div className="month-overview-container">
      <Navbar />
      <BalanceDisplay />
      <h2>{formattedMonth} Transactions</h2>
      <h3>
        Total for {formattedMonth}: £{monthTotal.toFixed(2)}
      </h3>

      <ul className="transaction-month-list">
        {filteredTransactions.map((transaction) => (
          <li key={transaction._id} className="transaction-month-item">
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

export default MonthOverview;
