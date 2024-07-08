import React, { useEffect, useState } from "react";

const FoodItemModal = ({ foodItem, onClose }) => {
  const [detailedFoodItem, setDetailedFoodItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (foodItem) {
      console.log(foodItem);
      // Fetch detailed information about the selected food item
      const fetchDetailedFoodItem = async () => {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.idMeal}`
          );
          const data = await response.json();
          if (data.meals && data.meals[0]) {
            setDetailedFoodItem(data.meals[0]);
            setError(null);
          } else {
            throw new Error('Food item not found');
          }
          // console.log(data);
          setDetailedFoodItem(data.meals[0]);
        } catch (error) {
          console.error("Error fetching detailed food item:", error);
        }
      };

      fetchDetailedFoodItem();
    }
  }, [foodItem]);


  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!foodItem) {
    return null; // Render nothing if no food item is selected
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleOutsideClick}>
        <div className="bg-white p-4 rounded shadow-lg w-full max-w-lg">
          <h3 className="mt-2 font-bold text-red-500">Error</h3>
          <p className="mt-1">{error}</p>
          <button onClick={onClose} className="mt-2 p-2 bg-blue-500 text-white rounded">Close</button>
        </div>
      </div>
    );
  }

  if (!detailedFoodItem) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="loader">
        </div>
      </div>
    ); // Render a loading state until the detailedFoodItem is fetched
  }


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-lg">
        <img
          src={foodItem.strMealThumb}
          alt={foodItem.strMeal}
          className="w-full h-80 object-cover rounded"
        />
        <h3 className="mt-2 font-bold gilroyb" style={{color: "rgba(2, 6, 12, 0.92)"}}>{detailedFoodItem.strMeal}</h3>
        <p className="mt-1 gilroy">Category: {detailedFoodItem.strCategory}</p>
        <p className="mt-1 gilroy">Area: {detailedFoodItem.strArea}</p>
        <p className="mt-1 gilroy">Tags: {detailedFoodItem.strTags}</p>
      </div>
    </div>
  );
};

export default FoodItemModal;
