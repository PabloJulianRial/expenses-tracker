import React, { createContext, useState, useContext } from "react";
import { Transaction, TransactionContextType } from "../types";

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
    setBalance(balance + transaction.amount);
  };

  const removeTransaction = (id: string) => {
    const transactionToRemove = transactions.find((t) => t.id === id);
    if (transactionToRemove) {
      setTransactions(transactions.filter((t) => t.id !== id));
      setBalance(balance - transactionToRemove.amount);
    }
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, balance, addTransaction, removeTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
