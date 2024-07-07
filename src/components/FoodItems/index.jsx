import React, { useState, useEffect } from "react";
import FilterSection from "../Filter";

// Utility function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const FoodItems = ({ onFoodItemClick }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [areaFilter, setAreaFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [regionShuffledItems, setRegionShuffledItems] = useState({});
  const [originalItems, setOriginalItems] = useState([]);

  // Fetch default food items on component mount
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
        );
        const data = await response.json();
        const shuffledItems = shuffleArray(data.meals || []);
        setFilteredItems(shuffledItems);
        setOriginalItems(shuffledItems);
        setRegionShuffledItems((prev) => ({
          ...prev,
          Indian: shuffledItems,
        }));
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  // Update filtered items when area filter or sort order changes
  useEffect(() => {
    const fetchFilteredItems = async () => {
      if (areaFilter) {
        if (!regionShuffledItems[areaFilter]) {
          try {
            const response = await fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaFilter}`
            );
            const data = await response.json();
            let items = shuffleArray(data.meals || []);
            setRegionShuffledItems((prev) => ({
              ...prev,
              [areaFilter]: items,
            }));
            if (sortOrder === "alphabetical") {
              items.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
            }
            setFilteredItems(items);
          } catch (error) {
            console.error("Error fetching filtered items:", error);
          }
        } else {
          let items = [...regionShuffledItems[areaFilter]];
          if (sortOrder === "alphabetical") {
            items.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
          } else if (sortOrder === "default") {
            items = [...regionShuffledItems[areaFilter]]; // Use the shuffled items for the current region
          }
          setFilteredItems(items);
        }
      } else {
        let items = [...originalItems];
        if (sortOrder === "alphabetical") {
          items.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
        } else if (sortOrder === "default") {
          items = [...originalItems]; // Use the initially shuffled items
        }
        setFilteredItems(items);
      }
    };

    fetchFilteredItems();
  }, [areaFilter, sortOrder, regionShuffledItems, originalItems]);

  return (
    <div>
      <FilterSection setAreaFilter={setAreaFilter} sortItems={setSortOrder} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4 pt-8 md:mx-16 lg:mx-20">
        {filteredItems.map((item) => (
          <div
            key={item.idMeal}
            className="p-1"
            onClick={() => onFoodItemClick(item)}
          >
            <img
              src={item.strMealThumb}
              alt={item.strMeal}
              className="w-full h-60 object-cover rounded-2xl"
            />
            <h3 className="mt-2 ml-4 font-bold">{item.strMeal}</h3>
            <p className="ml-4">
              Rating: {Math.floor(Math.random() * 5) + 1} stars
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodItems;
