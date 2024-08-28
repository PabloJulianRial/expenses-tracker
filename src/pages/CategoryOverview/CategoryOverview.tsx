import React from "react";
import { useParams } from "react-router-dom";
import { useTransactionContext } from "../../context/TransactionContext";
import Navbar from "../../components/Navbar/Navbar";
import "./CategoryOverview.scss";

const CategoryOverview: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { transactions } = useTransactionContext();

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.category === category
  );

  return (
    <div className="category-overview-container">
      <Navbar />
      <h2>{category} Transactions</h2>
      <ul className="transaction-cat-list">
        {filteredTransactions.map((transaction) => (
          <li key={transaction._id} className="transaction-cat-item">
            <span>{transaction.description}</span>
            <span>£{transaction.amount.toFixed(2)}</span>
            <span>{new Date(transaction.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryOverview;
