import React from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import AddTransactionForm from "../../components/AddTransactionForm/AddTransactionForm";
import "./AllTransactions.scss";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const AllTransactions: React.FC = () => {
  const { transactions, balance, removeTransaction } = useTransactionContext();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatAmount = (amount: number) => {
    return `£${amount.toFixed(2)}`;
  };

  return (
    <div>
      <Navbar />
      <div className="transactions-container">
        <h2 className="balance">Balance: {formatAmount(balance)}</h2>
        <div className="add-transaction-form">
          <AddTransactionForm />
        </div>
        <ul className="transactions-list">
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              <span>
                {transaction.description} ({transaction.category}) -{" "}
                {formatAmount(transaction.amount)} -{" "}
                {formatDate(transaction.date)}
              </span>
              <button
                className="remove-button"
                onClick={() => removeTransaction(transaction._id)}
                title="Remove transaction"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllTransactions;
