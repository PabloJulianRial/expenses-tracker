import React from "react";
import "./CategoryPopup.scss";

interface CategoryPopupProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  onClose: () => void;
}

const CategoryPopup: React.FC<CategoryPopupProps> = ({
  categories,
  onSelectCategory,
  onClose,
}) => {
  return (
    <div className="category-popup-overlay">
      <div className="category-popup">
        <h3>Select a Category</h3>
        <div className="category-grid">
          {categories.map((category) => (
            <div
              key={category}
              className="category-item"
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <button onClick={onClose} className="close-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CategoryPopup;
