import React, { useState } from "react";
import { useTransactionContext } from "../../context/TransactionContext";

const categories = [
  "groceries",
  "entertainment",
  "travel",
  "accommodation",
  "bills",
  "finances",
  "eating out",
  "expenses",
  "gifts",
  "holidays",
  "shopping",
  "personal care",
  "general",
];

const AddTransactionForm: React.FC = () => {
  const { addTransaction } = useTransactionContext();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount === "" || !description || !date || !category) {
      console.error("Please fill out all fields");
      return;
    }

    try {
      await addTransaction({
        description,
        amount: Number(amount),
        date,
        category,
      });

      setDescription("");
      setAmount("");
      setDate("");
      setCategory(categories[0]);
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
      <div>
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransactionForm;
