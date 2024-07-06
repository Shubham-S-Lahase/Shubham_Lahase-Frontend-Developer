import React, { useState } from "react";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./store";
import RecentSearches from "./components/recentSearches";
import FoodItems from "./components/FoodItems";
import FoodItemModal from "./components/FoodIetmModal";

function App() {
  const [selectedFoodItem, setSelectedFoodItem] = useState(null); // State to track the currently selected food item for the modal

    // Handle the event when a food item is clicked, setting the selected food item
  const handleFoodItemClick = (foodItem) => {
    setSelectedFoodItem(foodItem);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <RecentSearches />
        <FoodItems onFoodItemClick={handleFoodItemClick} />
        {selectedFoodItem && (
          <FoodItemModal
            foodItem={selectedFoodItem} // Pass the selected food item to the modal
            onClose={() => setSelectedFoodItem(null)}
          />
        )}
      </div>
    </Provider>
  );
}

export default App;
