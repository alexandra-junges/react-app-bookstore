import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BooksList from './books-list';
import {  MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import {
  getBooks,
  searchBookWithCategory,
  deleteBook
} from "../_services/book-service";

jest.mock("../_services/book-service", () => ({
  getBooks: jest.fn(),
  searchBookWithCategory: jest.fn(),
  deleteBook: jest.fn()
}))

describe("BooksList", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders the BooksList component", async () => {
    await act(async () => {  
      render(
        <MemoryRouter>
          <BooksList />
        </MemoryRouter>
      )
  })

    expect(screen.getByText(/books list/i)).toBeInTheDocument()
  })

  test("displays a list of books", async () => {
    const mockBooks = [
      {
        id: 1,
        name: "Book 1",
        author: "Author 1",
        description: "Description 1",
        categoryName: "Category 1",
        value: 10,
        publishDate: "2022-01-01"
      },
      {
        id: 2,
        name: "Book 2",
        author: "Author 2",
        description: "Description 2",
        categoryName: "Category 2",
        value: 20,
        publishDate: "2022-02-02"
      }
    ]

    getBooks.mockResolvedValue(mockBooks)

    render(
      <MemoryRouter>
        <BooksList />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText("Book 1")).toBeInTheDocument()
      expect(screen.getByText("Author 1")).toBeInTheDocument()
      expect(screen.getByText("Description 1")).toBeInTheDocument()
      expect(screen.getByText("Category 1")).toBeInTheDocument()
      expect(screen.getByText("10")).toBeInTheDocument()
      expect(screen.getByText("2022-01-01")).toBeInTheDocument()

      expect(screen.getByText("Book 2")).toBeInTheDocument()
      expect(screen.getByText("Author 2")).toBeInTheDocument()
      expect(screen.getByText("Description 2")).toBeInTheDocument()
      expect(screen.getByText("Category 2")).toBeInTheDocument()
      expect(screen.getByText("20")).toBeInTheDocument()
      expect(screen.getByText("2022-02-02")).toBeInTheDocument()
    })
  })

  test("deletes a book when delete button is clicked", async () => {
    const mockBooks = [
      {
        id: 1,
        name: "Book 1",
        author: "Author 1",
        description: "Description 1",
        categoryName: "Category 1",
        value: 10,
        publishDate: "2022-01-01"
      }
    ]

    window.confirm = jest.fn(() => true)

    getBooks.mockResolvedValue(mockBooks)
    deleteBook.mockResolvedValue()

    await act(async () => {
      render(
        <MemoryRouter>
          <BooksList />
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      fireEvent.click(screen.getAllByText("Delete")[0])

      expect(window.confirm).toHaveBeenCalled()

      waitFor(() => {
        expect(deleteBook).toHaveBeenCalledWith(1)
        expect(getBooks).toHaveBeenCalledTimes(2) 
        expect(screen.queryByText("Book 1")).not.toBeInTheDocument()
      })
    })
  })

  test("navigates to add/edit book page when new book button is clicked", async () => {
    await act(async () => { 
      render(
        <MemoryRouter>
          <BooksList />
        </MemoryRouter>
      )
    })
    
    waitFor(() => {
      const newBookButton = screen.getByText("New Book")
      expect(newBookButton).toBeInTheDocument()

      fireEvent.click(newBookButton)

      expect(screen.getByText(/add new book/i)).toBeInTheDocument()
    })
  })

  test("navigates to add/edit book page with book ID when edit button is clicked", async () => {
    const mockBooks = [
      {
        id: 1,
        name: "Book 1",
        author: "Author 1",
        description: "Description 1",
        categoryName: "Category 1",
        value: 10,
        publishDate: "2022-01-01"
      }
    ]
  
    getBooks.mockResolvedValue(mockBooks)

    await act(async () => {
      render(
        <MemoryRouter>
          <BooksList />
        </MemoryRouter>
      )
    })

    waitFor(() => {
      const editButton = screen.getByText("Edit")
      expect(editButton).toBeInTheDocument()
  
      fireEvent.click(editButton)
  
      expect(screen.getByText("Add/Edit Book Page 1")).toBeInTheDocument()
    })
  })  

  test("searches for books when a search query is entered", async () => {
    const mockBooks = [
      {
        id: 1,
        name: "Book 1",
        author: "Author 1",
        description: "Description 1",
        categoryName: "Category 1",
        value: 10,
        publishDate: "2022-01-01"
      }
    ]

    searchBookWithCategory.mockResolvedValue(mockBooks)
    await act(async () => {
      render(
        <MemoryRouter>
          <BooksList />
        </MemoryRouter>
      )
    })

    await waitFor(() => {

    fireEvent.change(screen.getByRole("textbox"), 
      { target: { value: "Category 1" }
    })

      waitFor(() => {
        expect(screen.getByText("Book 1")).toBeInTheDocument()
        expect(screen.getByText("Author 1")).toBeInTheDocument()
        expect(screen.getByText("Description 1")).toBeInTheDocument()
        expect(screen.getByText("Category 1")).toBeInTheDocument()
        expect(screen.getByText("10")).toBeInTheDocument()
        expect(screen.getByText("2022-01-01")).toBeInTheDocument()
      })
    })
  })
})
