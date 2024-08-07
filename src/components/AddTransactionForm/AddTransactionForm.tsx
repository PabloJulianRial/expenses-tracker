// src/components/AddTransactionForm/AddTransactionForm.tsx

import React, { useState } from "react";
import { useTransactionContext } from "../../context/TransactionContext";

const AddTransactionForm: React.FC = () => {
  const { addTransaction } = useTransactionContext(); // Get the addTransaction function from context
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">(""); // Can be empty or a number
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount === "" || !description || !date) {
      console.error("Please fill out all fields"); // Simple form validation
      return;
    }

    // Call the addTransaction function from the context
    try {
      await addTransaction({
        description,
        amount: Number(amount),
        date,
      });
      // Clear the form fields after submitting
      setDescription("");
      setAmount("");
      setDate("");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
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
