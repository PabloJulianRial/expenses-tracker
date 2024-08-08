import React from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import AddTransactionForm from "../../components/AddTransactionForm/AddTransactionForm";
import "./AllTransactions.scss";
import Navbar from "../../components/Navbar/Navbar";

const AllTransactions: React.FC = () => {
  const { transactions, balance, removeTransaction } = useTransactionContext();

  return (
    <div>
      <Navbar />
      <div className="transactions-container">
        <h2 className="balance">Balance: {balance}</h2>
        {/* Add the transaction form */}
        <div className="add-transaction-form">
          <AddTransactionForm />
        </div>
        <ul className="transactions-list">
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.description} - {transaction.amount} -{" "}
              {transaction.date}
              <button onClick={() => removeTransaction(transaction.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllTransactions;
