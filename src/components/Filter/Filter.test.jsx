import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FilterSection from "./index";

describe("FilterSection Component", () => {
  const mockSetAreaFilter = jest.fn();
  const mockSortItems = jest.fn();

  beforeEach(() => {
    mockSetAreaFilter.mockClear();
    mockSortItems.mockClear();
  });

  const renderFilterSection = () =>
    render(
      <FilterSection setAreaFilter={mockSetAreaFilter} sortItems={mockSortItems} />
    );

  test("renders filter buttons", () => {
    renderFilterSection();

    expect(screen.getByText("Filter")).toBeInTheDocument();
    expect(screen.getByText("Sort By")).toBeInTheDocument();
    expect(screen.getByText("Fast Delivery")).toBeInTheDocument();
    expect(screen.getByText("New on Swiggy")).toBeInTheDocument();
    expect(screen.getByText("Ratings 4.0+")).toBeInTheDocument();
    expect(screen.getByText("Pure Veg")).toBeInTheDocument();
    expect(screen.getByText("Offers")).toBeInTheDocument();
    expect(screen.getByText("Rs. 300-Rs. 600")).toBeInTheDocument();
    expect(screen.getByText("Less than 300")).toBeInTheDocument();
  });

  test("fetches and displays areas", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ meals: [{ strArea: "Italian" }, { strArea: "Chinese" }] }),
      })
    );

    renderFilterSection();

    fireEvent.click(screen.getByText("Filter"));

    await waitFor(() => expect(screen.getByText("Italian")).toBeInTheDocument());
    expect(screen.getByText("Chinese")).toBeInTheDocument();
  });

  test("applies area filter", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ meals: [{ strArea: "Italian" }, { strArea: "Chinese" }] }),
      })
    );

    renderFilterSection();

    fireEvent.click(screen.getByText("Filter"));

    await waitFor(() => expect(screen.getByText("Italian")).toBeInTheDocument());

    fireEvent.click(screen.getByLabelText("Italian"));
    fireEvent.click(screen.getByText("Apply"));

    expect(mockSetAreaFilter).toHaveBeenCalledWith("Italian");
  });

  test("sorts items", () => {
    renderFilterSection();

    fireEvent.click(screen.getByText("Sort By"));
    fireEvent.click(screen.getByText("Alphabetical"));

    expect(mockSortItems).toHaveBeenCalledWith("alphabetical");
  });

  test("toggles dropdown visibility", () => {
    renderFilterSection();

    fireEvent.click(screen.getByText("Filter"));
    expect(screen.getByText("Filter By Area")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Filter"));
    expect(screen.queryByText("Filter By Area")).not.toBeInTheDocument();
  });
});
