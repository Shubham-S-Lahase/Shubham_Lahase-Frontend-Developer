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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerRow, setItemsPerRow] = useState(4);

  const rowsPerPage = 3; // Number of rows per page

   // Function to update the number of items per row based on the screen size
   const updateItemsPerRow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1536) {
      setItemsPerRow(5);
    } else if (screenWidth >= 1280) {
      setItemsPerRow(4);
    } else if (screenWidth >= 1024) {
      setItemsPerRow(3);
    } else if (screenWidth >= 640) {
      setItemsPerRow(2);
    } else {
      setItemsPerRow(1);
    }
  };

    // Add event listener to handle window resize
    useEffect(() => {
      updateItemsPerRow();
      window.addEventListener("resize", updateItemsPerRow);
      return () => window.removeEventListener("resize", updateItemsPerRow);
    }, []);

      // Calculate items per page based on items per row and rows per page
  const itemsPerPage = itemsPerRow * rowsPerPage;

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
      setCurrentPage(1);
    };

    fetchFilteredItems();
  }, [areaFilter, sortOrder, regionShuffledItems, originalItems]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="border-b border-gray-300 pb-8 mb-8 mt-4 md:mx-16 lg:mx-40">
      <h2 className="pl-4 pt-8 text-xl font-bold">Top {areaFilter || 'Indian'} Food Items:</h2>
      <FilterSection setAreaFilter={setAreaFilter} sortItems={setSortOrder} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 p-4 pt-8">
        {currentItems.map((item) => (
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
      <div className="flex justify-center items-center mt-4">
          <img src="/back.png" 
          alt=""           o
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 cursor-pointer w-16 h-12" />
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
          <img src="/next.png" 
          alt=""           
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 cursor-pointer w-16 h-12" />
      </div>
    </div>
  );
};

export default FoodItems;
