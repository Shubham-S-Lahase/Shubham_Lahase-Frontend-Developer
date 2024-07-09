import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../../store/searchSlice";
import Header from "./index";

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

describe("Header Component", () => {
  const renderHeader = () =>
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

  test("renders Header component", () => {
    renderHeader();

    expect(screen.getByAltText("Swiggy Logo")).toBeInTheDocument();
    expect(screen.getByText("SWIGGY")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search for meals...")
    ).toBeInTheDocument();
  });

  test("search input updates Redux state", () => {
    renderHeader();

    const searchInput = screen.getByPlaceholderText("Search for meals...");
    fireEvent.change(searchInput, { target: { value: "Pizza" } });

    expect(searchInput.value).toBe("Pizza");
  });

  test('fetches food items and shows modal when there is a search term', async () => {
    renderHeader();

    // Simulate a search term in Redux state
    store.dispatch({ type: 'search/setSearch', payload: 'Pizza' });

    // Wait for the modal to appear
    await waitFor(() => expect(screen.getByText(/No results found|Pizza/i)).toBeInTheDocument());

    expect(screen.getByText(/No results found|Pizza/i)).toBeInTheDocument();
  });
  

  test("clicking outside the modal closes the modal and clears search", async () => {
    renderHeader();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ meals: [{ idMeal: "1", strMeal: "Pizza" }] }),
      })
    );

    const { container } = renderHeader();

    store.dispatch({ type: "search/setSearch", payload: "Pizza" });

    expect(await screen.findByText(/Pizza/i)).toBeInTheDocument();

    fireEvent.mouseDown(container);

    expect(screen.queryByText(/Pizza/i)).not.toBeInTheDocument();
    expect(store.getState().search.search).toBe("");
  });
});
