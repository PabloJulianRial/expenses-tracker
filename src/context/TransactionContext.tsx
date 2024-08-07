import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { db } from "../firebaseconfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
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
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
  removeTransaction: (id: string) => Promise<void>;
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
    if (currentUser) {
      const fetchTransactions = async () => {
        try {
          const q = query(
            collection(db, "transactions"),
            where("userId", "==", currentUser.uid)
          );
          const querySnapshot = await getDocs(q);
          const fetchedTransactions: Transaction[] = [];
          querySnapshot.forEach((doc) => {
            fetchedTransactions.push({
              id: doc.id,
              ...doc.data(),
            } as Transaction);
          });
          setTransactions(fetchedTransactions);

          const calculatedBalance = fetchedTransactions.reduce(
            (acc, transaction) => acc + transaction.amount,
            0
          );
          setBalance(calculatedBalance);
        } catch (error) {
          console.error("Error fetching transactions: ", error);
        }
      };

      fetchTransactions();
    }
  }, [currentUser]);

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    if (currentUser) {
      try {
        console.log("Adding transaction:", transaction);
        const docRef = await addDoc(collection(db, "transactions"), {
          ...transaction,
          userId: currentUser.uid,
        });
        console.log("Transaction added with ID:", docRef.id); // Debugging log

        const newTransaction = { ...transaction, id: docRef.id };
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          newTransaction,
        ]);
        setBalance((prevBalance) => prevBalance + transaction.amount);
      } catch (error) {
        console.error("Error adding transaction: ", error);
      }
    } else {
      console.error("No current user, cannot add transaction");
    }
  };

  const removeTransaction = async (id: string) => {
    try {
      const transactionDocRef = doc(db, "transactions", id);
      await deleteDoc(transactionDocRef);

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
      console.error("Error removing transaction: ", error);
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
