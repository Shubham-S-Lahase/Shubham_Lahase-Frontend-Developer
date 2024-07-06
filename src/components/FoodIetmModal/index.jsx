import React from 'react';

const FoodItemModal = ({ foodItem, onClose }) => {
  if (!foodItem) return null; // If no food item is selected, return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-lg">
        <button onClick={onClose} className="absolute top-2 right-2">Close</button>
        <img src={foodItem.strMealThumb} alt={foodItem.strMeal} className="w-full h-48 object-cover rounded" />
        <h3 className="mt-2 font-bold">{foodItem.strMeal}</h3>
        <p className="mt-1">Category: {foodItem.strCategory}</p>
        <p className="mt-1">Area: {foodItem.strArea}</p>
        <p className="mt-1">Instructions: {foodItem.strInstructions}</p>
      </div>
    </div>
  );
};

export default FoodItemModal;
