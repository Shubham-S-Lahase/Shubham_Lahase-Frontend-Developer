import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import FoodItemModal from "./index";

describe("FoodItemModal Component", () => {
  const mockFoodItem = {
    idMeal: "1",
    strMeal: "Pizza",
    strMealThumb: "pizza.jpg",
  };

  const mockDetailedFoodItem = {
    idMeal: "1",
    strMeal: "Pizza",
    strCategory: "Main Course",
    strArea: "Italian",
    strTags: "Cheesy",
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            meals: [mockDetailedFoodItem],
          }),
      })
    );
  });
  
  test("fetches and displays detailed food item", async () => {
    render(<FoodItemModal foodItem={mockFoodItem} onClose={mockOnClose} />);

    await waitFor(() =>
      expect(screen.getByText("Category: Main Course")).toBeInTheDocument()
    );
    expect(screen.getByText("Area: Italian")).toBeInTheDocument();
    expect(screen.getByText("Tags: Cheesy")).toBeInTheDocument();
  });

  test("calls onClose when clicking outside the modal", async () => {
    render(<FoodItemModal foodItem={mockFoodItem} onClose={mockOnClose} />);

    await waitFor(() =>
      expect(screen.getByText("Category: Main Course")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByTestId("modal-overlay"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("does not render modal if no food item is selected", () => {
    const { container } = render(<FoodItemModal foodItem={null} onClose={mockOnClose} />);
    expect(container.firstChild).toBeNull();
  });

});
