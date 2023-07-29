import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddEditCategory from "./add-edit-category";
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import {
  createCategory,
  updateCategory,
  getCategoryById
} from "../_services/category-service";

jest.mock("../_services/category-service", () => ({
  createCategory: jest.fn(),
  updateCategory: jest.fn(),
  getCategoryById: jest.fn()
}))

describe("AddEditCategory", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders the AddEditCategory component", () => {
    render(
        <MemoryRouter>
          <AddEditCategory />
        </MemoryRouter>
    )

    expect(screen.getByText(/add new category/i)).toBeInTheDocument()
  })

  test("creates a new category when the form is submitted", async () => {
    createCategory.mockResolvedValue()

    render(
      <MemoryRouter>
        <AddEditCategory />
      </MemoryRouter>
    )

    expect(screen.getByText("Save")).toBeDisabled

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: "New Category" }
    })

    fireEvent.click(screen.getByText("Save"))

    await waitFor(() => {
      expect(createCategory).toHaveBeenCalledWith({ id: 0, name: "New Category" })

      expect(screen.getByText("Your category has been created.")).toBeInTheDocument()
    })
  })

  test("updates an existing category when the form is submitted", async () => {
    const mockCategory = {
      id: 1,
      name: "Category 1"
    }

    getCategoryById.mockResolvedValue(mockCategory)
    updateCategory.mockResolvedValue()

    render(
      <MemoryRouter>
        <AddEditCategory />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: "Updated Category" }
      })

      fireEvent.click(screen.getByText("Save"))

      waitFor(() => {
        expect(updateCategory).toHaveBeenCalledWith(1, { id: 1, name: "Updated Category" })

        expect(screen.getByText("The category has been edited.")).toBeInTheDocument()
      })
    })
  })

  test("navigates to the categories list page when cancel button is clicked", () => {
    render(
      <MemoryRouter>
        <AddEditCategory />
      </MemoryRouter>
    )

    waitFor(() => {
      const cancelButton = screen.getByText("Cancel")
      expect(cancelButton).toBeInTheDocument()

      fireEvent.click(cancelButton)

      expect(screen.getByRole('heading', { name: /categories list/i })).toBeInTheDocument()
    })
  })
})
