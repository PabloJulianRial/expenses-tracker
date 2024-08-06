import React, { useState } from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import { Transaction } from "../../types";

const AddTransactionForm: React.FC = () => {
  const { addTransaction } = useTransactionContext();

  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTransaction: Transaction = {
      id: new Date().toISOString(),
      description,
      amount,
      date,
    };

    addTransaction(newTransaction);

    setDescription("");
    setAmount(0);
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransactionForm;
