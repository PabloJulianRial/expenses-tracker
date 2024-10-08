import React, { useState } from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import AddTransactionForm from "../../components/AddTransactionForm/AddTransactionForm";
import Navbar from "../../components/Navbar/Navbar";
import "./AllTransactions.scss";
import BalanceDisplay from "../../components/BalanceDisplay/BalanceDisplay";

const AllTransactions: React.FC = () => {
  const { transactions, removeTransaction } = useTransactionContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <Navbar />

      <div className="transactions-container">
        <BalanceDisplay />
        <h2 className="balance">All Transactions</h2>

        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <button
          onClick={toggleFormVisibility}
          className="add-transaction-button"
        >
          {showForm ? "Hide Form" : "Add Transaction"}
        </button>

        {showForm && (
          <div className="add-transaction-form">
            <AddTransactionForm />
          </div>
        )}

        <ul className="transactions-list">
          {filteredTransactions.map((transaction) => (
            <li key={transaction._id}>
              <span>{transaction.description}</span>
              <span>£{transaction.amount.toFixed(2)}</span>
              <span>{new Date(transaction.date).toLocaleDateString()}</span>
              <button
                onClick={() => removeTransaction(transaction._id)}
                className="remove-button"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllTransactions;
