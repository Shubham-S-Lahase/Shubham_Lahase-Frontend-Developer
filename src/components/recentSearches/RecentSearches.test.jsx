import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../../store/searchSlice";
import RecentSearches from "./index";

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

describe("RecentSearches Component", () => {
  const renderRecentSearches = (onFoodItemClick = jest.fn()) =>
    render(
      <Provider store={store}>
        <RecentSearches onFoodItemClick={onFoodItemClick} />
      </Provider>
    );

  test("renders Recent Searches header", () => {
    renderRecentSearches();
    expect(screen.getByText("Recent Searches")).toBeInTheDocument();
  });

  test("displays 'No recent searches' when there are no recent searches", () => {
    renderRecentSearches();
    expect(screen.getByText("No recent searches")).toBeInTheDocument();
  });

  test("displays recent searches when there are recent searches", () => {
    const recentSearches = [
      {
        idMeal: "1",
        strMeal: "Pizza",
        strMealThumb: "https://via.placeholder.com/150",
      },
    ];

    store.dispatch({
      type: "search/addRecentSearch",
      payload: recentSearches[0],
    });

    renderRecentSearches();

    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Recent Searches")).toBeInTheDocument();
  });

  test("calls onFoodItemClick when a recent search item is clicked", () => {
    const recentSearches = [
      {
        idMeal: "1",
        strMeal: "Pizza",
        strMealThumb: "https://via.placeholder.com/150",
      },
    ];

    store.dispatch({
      type: "search/addRecentSearch",
      payload: recentSearches[0],
    });

    const onFoodItemClick = jest.fn();
    renderRecentSearches(onFoodItemClick);

    fireEvent.click(screen.getByText("Pizza"));

    expect(onFoodItemClick).toHaveBeenCalledWith({
      idMeal: "1",
      strMeal: "Pizza",
      strMealThumb: "https://via.placeholder.com/150",
    });
  });
});
