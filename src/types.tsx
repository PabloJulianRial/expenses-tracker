export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
}
export interface TransactionContextType {
  transactions: Transaction[];
  balance: number;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
}
