import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
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

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!currentUser) return;

      try {
        const response = await fetch("http://localhost:5000/api/transactions", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        setTransactions(data);

        const calculatedBalance = data.reduce(
          (acc: number, transaction: Transaction) => acc + transaction.amount,
          0
        );
        setBalance(calculatedBalance);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [currentUser]);

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    if (!currentUser) return;

    try {
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await currentUser.getIdToken()}`,
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }

      const newTransaction = await response.json();
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
      setBalance((prevBalance) => prevBalance + transaction.amount);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const removeTransaction = async (id: string) => {
    if (!currentUser) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove transaction");
      }

      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );

      const removedTransaction = transactions.find(
        (transaction) => transaction.id === id
      );
      if (removedTransaction) {
        setBalance((prevBalance) => prevBalance - removedTransaction.amount);
      }
    } catch (error) {
      console.error("Error removing transaction:", error);
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
