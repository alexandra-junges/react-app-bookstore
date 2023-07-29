import React  from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import BookStoreHome from "./home";
import BooksList from "../books/books-list";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

jest.mock('axios');

describe('BookStoreHome', () => {
    test('renders correctly', () => {
        render(
            <MemoryRouter>
                <BookStoreHome />
            </MemoryRouter>
        )
        const secondHeading = screen.getByRole('heading')
        expect(secondHeading).toBeInTheDocument()

        const paragraphElement = screen.getByText(/A platform to search about your preferred books/i)
        expect(paragraphElement).toBeInTheDocument()
    })

    test('renders See Books button', () => {
        render(
            <MemoryRouter>
                <BookStoreHome />
            </MemoryRouter>
        )
        const seeBooksButton = screen.getByRole('button', {
            name: 'See Books',
        })
        expect(seeBooksButton).toBeInTheDocument()
    })

    test('handle click is called', async() => {
        render(
            <MemoryRouter>
                <BookStoreHome />
                <BooksList />
            </MemoryRouter>
        )

        const seeBooksButton = screen.getByRole('button', {
            name: 'See Books',
        })


        userEvent.click(seeBooksButton)
 
        await waitFor(() => {
            const booksListHeading = screen.getByRole('heading', {
                    name: /books list/i
            })
            expect(booksListHeading).toBeInTheDocument()
        })
    })
})