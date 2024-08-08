import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  balance: number;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  removeTransaction: (id: string) => void;
}

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

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState<number>(0);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    if (currentUser) {
      const newTransaction = {
        ...transaction,
        id: new Date().getTime().toString(),
      };
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
      setBalance((prevBalance) => prevBalance + transaction.amount);
    } else {
      console.error("No current user, cannot add transaction");
    }
  };

  const removeTransaction = (id: string) => {
    const transactionToRemove = transactions.find((t) => t.id === id);
    if (transactionToRemove) {
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
      setBalance((prevBalance) => prevBalance - transactionToRemove.amount);
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
