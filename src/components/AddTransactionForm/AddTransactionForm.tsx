import React, { useState } from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import CategoryPopup from "../Category/CategoryPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

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
  const [date, setDate] = useState(""); // Date state added
  const [category, setCategory] = useState("");
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || amount === "" || !date || !category) {
      console.error("Please fill out all fields");
      return;
    }

    console.log("Form data to submit:", {
      description,
      amount,
      date,
      category,
    });

    try {
      await addTransaction({
        description,
        amount: Number(amount),
        date, // Include date in the transaction object
        category,
      });

      setDescription("");
      setAmount("");
      setDate("");
      setCategory("");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleCategoryChange = () => {
    setShowCategoryPopup(true);
  };

  const handleSelectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setShowCategoryPopup(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description :</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => setShowCategoryPopup(true)}
            required
          />
        </div>
        <div>
          <label>Amount :</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Date :</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)} // Handle date input change
            required
          />
        </div>
        <div>
          <label>Category :</label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={category}
              readOnly
              onClick={handleCategoryChange}
              placeholder="Select a category"
              required
            />
            <FontAwesomeIcon
              icon={faEdit}
              onClick={handleCategoryChange}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <button type="submit">Add Transaction</button>
      </form>
      {showCategoryPopup && (
        <CategoryPopup
          categories={categories}
          onSelectCategory={handleSelectCategory}
          onClose={() => setShowCategoryPopup(false)}
        />
      )}
    </>
  );
};

export default AddTransactionForm;
