import React, { useState, useEffect } from 'react';
import FilterSection from '../Filter';

const FoodItems = ({onFoodItemClick}) => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [areaFilter, setAreaFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Fetch default food items on component mount
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian');
        const data = await response.json();
        console.log(data);
        setFoodItems(data.meals || []);
        setFilteredItems(data.meals || []);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []);

  // Update filtered items when area filter or sort order changes
  useEffect(() => {
    const fetchFilteredItems = async () => {
      if (areaFilter) {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaFilter}`);
          const data = await response.json();
          let items = data.meals || [];
          
          if (sortOrder === 'alphabetical') {
            items.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
          }
          setFilteredItems(items);
        } catch (error) {
          console.error('Error fetching filtered items:', error);
        }
      } else {
        setFilteredItems(foodItems);
      }
    };

    fetchFilteredItems();
  }, [areaFilter, sortOrder, foodItems]);

  return (
    <div>
      <FilterSection setAreaFilter={setAreaFilter} sortItems={setSortOrder} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pt-8 md:mx-16 lg:mx-20">
        {filteredItems.map(item => (
          <div key={item.idMeal} className="border p-4 rounded" onClick={()=> onFoodItemClick(item)}>
            <img src={item.strMealThumb} alt={item.strMeal} className="w-full h-48 object-cover rounded" />
            <h3 className="mt-2 font-bold">{item.strMeal}</h3>
            <p className="mt-1">Rating: {Math.floor(Math.random() * 5) + 1} stars</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodItems;