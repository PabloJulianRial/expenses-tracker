import "./AllTransactions.scss";
import React from "react";
import { useTransactionContext } from "../../context/TransactionContext";

const AllTransactions: React.FC = () => {
  const { transactions, balance, addTransaction, removeTransaction } =
    useTransactionContext();

  const handleAddTransaction = () => {
    const newTransaction = {
      id: new Date().toISOString(),
      description: "New Transaction",
      amount: 100,
      date: new Date().toISOString(),
    };
    addTransaction(newTransaction);
  };

  return (
    <div>
      <h2>Balance: {balance}</h2>
      <button onClick={handleAddTransaction}>Add Transaction</button>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.description} - {transaction.amount}
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
