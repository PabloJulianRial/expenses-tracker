export interface Transaction {
  _id: string;
  description: string;
  amount: number;
  date: string;
}

export interface TransactionContextType {
  transactions: Transaction[];
  balance: number;
  addTransaction: (transaction: Omit<Transaction, "_id">) => void;
  removeTransaction: (id: string) => void;
}
