import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FoodItems from "./index";

jest.mock("../Filter", () => ({ setAreaFilter, sortItems }) => (
  <div>
    <button onClick={() => setAreaFilter("Italian")}>Filter Italian</button>
    <button onClick={() => setAreaFilter("Indian")}>Filter Indian</button>
    <button onClick={() => sortItems("alphabetical")}>Sort Alphabetical</button>
    <button onClick={() => sortItems("default")}>Sort Default</button>
  </div>
));

describe("FoodItems Component", () => {
  const mockOnFoodItemClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderFoodItems = () =>
    render(<FoodItems onFoodItemClick={mockOnFoodItemClick} />);

  test("fetches and displays food items", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            meals: [
              { idMeal: "1", strMeal: "Pizza", strMealThumb: "pizza.jpg" },
              { idMeal: "2", strMeal: "Pasta", strMealThumb: "pasta.jpg" },
            ],
          }),
      })
    );

    renderFoodItems();

    await waitFor(() => expect(screen.getByText("Pizza")).toBeInTheDocument());
    expect(screen.getByText("Pasta")).toBeInTheDocument();
  });

  test("applies area filter", async () => {
    global.fetch = jest.fn((url) => {
      if (url.includes("Indian")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              meals: [{ idMeal: "1", strMeal: "Biryani", strMealThumb: "biryani.jpg" }],
            }),
        });
      }
      if (url.includes("Italian")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              meals: [{ idMeal: "2", strMeal: "Pizza", strMealThumb: "pizza.jpg" }],
            }),
        });
      }
      return Promise.reject(new Error("Unknown API call"));
    });

    renderFoodItems();

    await waitFor(() => expect(screen.getByText("Biryani")).toBeInTheDocument());

    fireEvent.click(screen.getByText("Filter Italian"));
    await waitFor(() => expect(screen.getByText("Pizza")).toBeInTheDocument());
  });

  test("sorts items", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            meals: [
              { idMeal: "1", strMeal: "Biryani", strMealThumb: "biryani.jpg" },
              { idMeal: "2", strMeal: "Pizza", strMealThumb: "pizza.jpg" },
              { idMeal: "3", strMeal: "Pasta", strMealThumb: "pasta.jpg" },
            ],
          }),
      })
    );

    renderFoodItems();

    await waitFor(() => expect(screen.getByText("Biryani")).toBeInTheDocument());

    fireEvent.click(screen.getByText("Sort Alphabetical"));
    const items = screen.getAllByRole("heading", { level: 3 });
    expect(items[0]).toHaveTextContent("Biryani");
    expect(items[1]).toHaveTextContent("Pasta");
    expect(items[2]).toHaveTextContent("Pizza");
  });

  test("handles pagination", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            meals: [
              { idMeal: "1", strMeal: "Biryani", strMealThumb: "biryani.jpg" },
              { idMeal: "2", strMeal: "Pizza", strMealThumb: "pizza.jpg" },
              { idMeal: "3", strMeal: "Pasta", strMealThumb: "pasta.jpg" },
              { idMeal: "4", strMeal: "Burger", strMealThumb: "burger.jpg" },
              { idMeal: "5", strMeal: "Salad", strMealThumb: "salad.jpg" },
            ],
          }),
      })
    );

    renderFoodItems();

    await waitFor(() => expect(screen.getByText("Biryani")).toBeInTheDocument());

    fireEvent.click(screen.getByAltText("next"));
    await waitFor(() => expect(screen.getByText("Burger")).toBeInTheDocument());

    fireEvent.click(screen.getByAltText("back"));
    await waitFor(() => expect(screen.getByText("Biryani")).toBeInTheDocument());
  });

  test("handles item click", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            meals: [{ idMeal: "1", strMeal: "Biryani", strMealThumb: "biryani.jpg" }],
          }),
      })
    );

    renderFoodItems();

    await waitFor(() => expect(screen.getByText("Biryani")).toBeInTheDocument());

    fireEvent.click(screen.getByText("Biryani"));
    expect(mockOnFoodItemClick).toHaveBeenCalledWith({
      idMeal: "1",
      strMeal: "Biryani",
      strMealThumb: "biryani.jpg",
    });
  });
});
