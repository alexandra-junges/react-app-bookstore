import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CategoriesList from './categories-list';
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { 
    deleteCategory,
    searchCategory,
    getCategories
} from '../_services/category-service';

jest.mock('../_services/category-service', () => ({
    getCategories: jest.fn(),
    searchCategory: jest.fn(),
    deleteCategory: jest.fn(),
    getBookByCategoryId: jest.fn()
}))

describe('CategoriesList', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders CategoriesList component', async () => {
      await act(async () => {  
        render(
          <MemoryRouter>
            <CategoriesList />
          </MemoryRouter>
        )
      })

        expect(screen.getByText(/categories list/i)).toBeInTheDocument()
    })

    test("fetches categories and displays them in a table", async () => {
        const mockCategories = [
          { id: 1, name: "Category 1" },
          { id: 2, name: "Category 2" }
        ]
    
        getCategories.mockResolvedValue(mockCategories)
    
        await act(async () => {
          render(
            <MemoryRouter>
              <CategoriesList />
            </MemoryRouter>
          )
        })
    
        await waitFor(() => {
          expect(screen.getByText("New Category")).toBeInTheDocument()
    
          expect(screen.getByRole("table")).toBeInTheDocument()
    
          expect(screen.getByText("Category 1")).toBeInTheDocument()
          expect(screen.getByText("Category 2")).toBeInTheDocument()
        })
      })

      test("displays a message when no categories are found", async () => {
        getCategories.mockResolvedValue([])
    
        await act(async () => {
          render(
            <MemoryRouter>
              <CategoriesList />
            </MemoryRouter>
          )
        })
    
        await waitFor(() => {
          expect(screen.getByText("No categories found.")).toBeInTheDocument()
        })
      })

      test("searches for categories and updates the table", async () => {
        const mockCategories = [
          { id: 1, name: "Category 1" },
          { id: 2, name: "Category 2" }
        ]
    
        searchCategory.mockResolvedValue(mockCategories)
    
        await act(async () => {
          render(
            <MemoryRouter>
              <CategoriesList />
            </MemoryRouter>
          )
        })
    
        await waitFor(() => {
          fireEvent.change(screen.getByRole("textbox"), {
            target: { value: "Category" }
          })
    
          waitFor(() => {
            expect(screen.getByText("Category 1")).toBeInTheDocument()
            expect(screen.getByText("Category 2")).toBeInTheDocument()
          })
        })
      })

      test("deletes a category when the delete button is clicked", async () => {
        const mockCategories = [
          { id: 1, name: "Category 1" },
          { id: 2, name: "Category 2" }
        ]

        window.confirm = jest.fn(() => true)
        
        getCategories.mockResolvedValue(mockCategories)
        deleteCategory.mockResolvedValue()
    
        await act(async () => {
          render(
            <MemoryRouter>
              <CategoriesList />
            </MemoryRouter>
          )
        })
    
        await waitFor(() => {
          fireEvent.click(screen.getAllByText("Delete")[0])

          expect(window.confirm).toHaveBeenCalled()
    
          waitFor(() => {
            expect(deleteCategory).toHaveBeenCalledWith(1)
            expect(getCategories).toHaveBeenCalledTimes(2)

            expect(screen.getByText("The category has been deleted")).toBeInTheDocument()
          })
        })
      })

})