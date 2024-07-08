import React from "react";
import { useSelector } from "react-redux";

const RecentSearches = ({onFoodItemClick}) => {
   // Access recentSearches from the Redux store
  const recentSearches = useSelector((state) => state.search.recentSearches);

  const handleItemClick = (item) => {
    const mappedItem = {
      idMeal: item.idMeal,
      strMeal: item.strMeal || item.name,
      strMealThumb: item.strMealThumb || item.image,
    };
    onFoodItemClick(mappedItem);
  }

  return (
    <div className="p-4 pb-16 border-b md:mx-16 lg:mx-40 border-gray-300">
      <h2 className="text-xl font-bold mb-8 mt-4">Recent Searches</h2>
      {recentSearches.length > 0 ? (
        <div overflow-x-auto>
          <ul className="flex max-w-full space-x-4 p-2 overflow-x-auto custom-scrollbar">
            {recentSearches.map((item, index) => (
              <li
                key={index}
                className="flex-shrink-0 w-64 h-60 ssm:w-32 ssm:h-32 relative rounded-xl bg-cover bg-center flex items-end p-2 text-white font-bold overflow-hidden"
                style={{ backgroundImage: `url(${item.strMealThumb})` }}
                onClick={() => handleItemClick(item)}
              >
                <div className="bg-black bg-opacity-50 w-full text-left p-1 rounded-b ssm:text-xs">
                  <span className="truncate">{item.strMeal}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No recent searches</p>
      )}
    </div>
  );
};

export default RecentSearches;
