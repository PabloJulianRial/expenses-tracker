import React from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import AddTransactionForm from "../../components/TransactionForm/TransactionForm";
import "./AllTransactions.scss";

const AllTransactions: React.FC = () => {
  const { transactions, balance, removeTransaction } = useTransactionContext();

  return (
    <div className="transactions-container">
      <h2 className="balance">Balance: {balance}</h2>
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
  );
};

export default AllTransactions;
