import React, { useContext, useEffect, useState, useRef } from "react";
import { SearchContext } from "../../context/searchContext";

const Header = () => {
  const { search, setSearch } = useContext(SearchContext); // Get search state and setter from context
  const [foodItems, setFoodItems] = useState([]); // State to store fetched food items
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const modalRef = useRef(null); // Ref to track modal element


  // Fetch food items when search query changes
  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
          );
          const data = await response.json();
          setFoodItems(data.meals || []);
          setShowModal(true);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setFoodItems([]);
        setShowModal(false);
      }
    };

    fetchData();
  }, [search]); // Re-run effect when search query changes

  // Handle clicks outside the modal to close it
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
      setSearch(""); // Clear search input when modal closes
    }
  };

  // Handle mouse leaving the modal to close it
  const handleMouseLeave = () => {
    setShowModal(false);
    setSearch(""); 
  };


  // Add and clean up event listener for outside clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-md relative">
      <div className="flex items-center space-x-2 mb-2 md:mb-0">
        <img
          src="https://cdn.worldvectorlogo.com/logos/swiggy-1.svg"
          alt="Swiggy Logo"
          className="h-8"
        />
        <div className="text-lg md:text-2xl font-bold" style={{ color: "#fc8019" }}>
          SWIGGY
        </div>
      </div>
      <div className="relative w-full md:w-1/2 lg:w-1/3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 pl-3 w-full font-medium bg-gray-200 focus:outline-none placeholder-gray-600 text-sm md:text-base"
          placeholder="Search for meals..."
        />
        <img
          src="/search.png"
          alt="Magnifier Icon"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600"
        />
      </div>

        {/* Modal for search results */}
      {showModal && (
        <div
          ref={modalRef}
          className="absolute right-4 top-full mt-2 w-[92%] md:w-[48%] lg:w-[32.5%] bg-white border rounded shadow-lg z-10 max-h-[60vh] overflow-y-auto custom-scrollbar"
          onMouseLeave={handleMouseLeave}
        >
          {foodItems.length > 0 ? (
            <ul>
              {foodItems.map((item) => (
                <li
                  key={item.idMeal}
                  className="p-2 bg-transparent border-b cursor-pointer"
                  onClick={() => console.log("Clicked:", item.strMeal)} // Example onClick handler
                >
                  {item.strMeal}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-2">No results found</div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;