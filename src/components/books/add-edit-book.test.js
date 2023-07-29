import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddEditBook from "./add-edit-book";
import '@testing-library/jest-dom/extend-expect';
import BooksList from './books-list'
import { 
  getCategories,
  createBook,
  updateBook,
  getBookById
} from "../_services/book-service";

jest.mock("../_services/book-service", () => ({
  getCategories: jest.fn(),
  createBook: jest.fn(),
  updateBook: jest.fn(),
  getBookById: jest.fn(),
}))

describe("AddEditBook", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders the AddEditBook component", () => {
    render(
      <MemoryRouter>
        <AddEditBook />
      </MemoryRouter>
    )
  
    expect(screen.getByText(/add new book/i)).toBeInTheDocument()
  })

  test("creates a new book when the form is submitted", async () => {
    const mockCategories = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ]

    getCategories.mockResolvedValue(mockCategories)
    createBook.mockResolvedValue()

    render(
      <MemoryRouter>
        <AddEditBook />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText(/book's name/i), {
        target: { value: "New Book" },
      })
      fireEvent.change(screen.getByPlaceholderText(/author's name/i), {
        target: { value: "Author 1" },
      })
      fireEvent.change(screen.getByRole('textbox', {name: /with textarea/i}), {
        target: { value: "Description 1" },
      })
      fireEvent.change(screen.getByPlaceholderText(/€/i), {
        target: { value: "10" },
      })
      fireEvent.change(screen.getByPlaceholderText(/publish date/i), {
        target: { value: "2023-01-01" },
      })

      fireEvent.click(screen.getByText("Save"))

      waitFor(() => {
        expect(createBook).toHaveBeenCalledWith({
          id: 0,
          categoryId: 0,
          name: "New Book",
          author: "Author 1",
          description: "Description 1",
          value: 10,
          publishDate: "2023-01-01",
        })

        expect(screen.getByText("Your book has been created.")).toBeInTheDocument()
      })
    })
  })

  test("navigates to the books list page when cancel button is clicked", () => {
    render(
      <MemoryRouter>
        <AddEditBook />
        <BooksList />
      </MemoryRouter>
    )

    const cancelButton = screen.getByText("Cancel")
    expect(cancelButton).toBeInTheDocument()

    fireEvent.click(cancelButton)

    expect(screen.getByText("Books List")).toBeInTheDocument()
  })
})
