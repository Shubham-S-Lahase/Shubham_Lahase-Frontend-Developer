import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '', // State to store the current search query
  recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || [], // Load recent searches from localStorage or initialize as an empty array
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload; // Update the current search query
    },
    addRecentSearch: (state, action) => {
        // Add the new search item to the top of recent searches, showing recent 5 searched items
      state.recentSearches = [action.payload, ...state.recentSearches.filter(item => item.strMeal !== action.payload.strMeal)].slice(0, 5);
      // Save the updated recent searches to localStorage
      localStorage.setItem('recentSearches', JSON.stringify(state.recentSearches));
    },
  },
});

export const { setSearch, addRecentSearch } = searchSlice.actions;
export default searchSlice.reducer;
