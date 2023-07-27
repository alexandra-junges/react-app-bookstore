/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import {
  getBooks,
  getBookById,
  getBookByCategoryId,
  searchBookWithCategory,
  createBook,
  updateBook,
  deleteBook
 } from "./book-service";

 jest.mock('axios')

describe('BookService', () => {
    const mockedBooksList =  [
      { 
        id: 1, 
        name: 'Book 1',
        author: 'Nome do Author 1',
        description: 'descricao do livro 1',
        categoryName: 'Romance',
        value: 10,
        publishDate:'2023, 2, 10'
    },
    { 
        id: 2,
        name: 'Book 2',
        author: 'Nome do Author 2',
        description: 'descricao do livro 2',
        categoryName: 'Design',
        value: 20,
        publishDate: '2023, 4, 3'
    },
    { 
        id: 3,
        name: 'Book 3',
        author: 'Nome do Author 3',
        description: 'descricao do livro 3',
        categoryName: 'Aventura',
        value: 30,
        publishDate: '2023, 5, 23'
    },
    ]

    test('fetches books', async () => {
      axios.get = jest.fn().mockResolvedValue({ data: [ mockedBooksList ] })

      const result = await getBooks()

      expect(result).toEqual([ mockedBooksList ])
      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Books`)
    })

    test('fetches a book by ID', async () => {
      axios.get = jest.fn().mockResolvedValue({ data: [ mockedBooksList ] })

      const bookId = 1
      const result = await getBookById(bookId)
      expect(result).toEqual([ mockedBooksList ])

      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Books/${bookId}`)
    })

    test('fetches book by category ID', async () => {
      axios.get = jest.fn().mockResolvedValue({ data: [ mockedBooksList ] })

      const categoryId = 1
      const result = await getBookByCategoryId(categoryId)
      expect(result).toEqual([ mockedBooksList ])

      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Books/get-books-by-category/${categoryId}`)
    })

    test('searches for Books by name', async () => {
      axios.get = jest.fn().mockResolvedValue({ data: [ mockedBooksList ] })

      const bookName = 'Category 1'
      const result = await searchBookWithCategory(bookName)
      expect(result).toEqual([ mockedBooksList ])

      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Books/search-book-with-category/${bookName}`)
    })

    test('creates a new book', async () => {
      axios.post = jest.fn()

      const book = { id: 1, name: 'New Book' }
      await createBook(book)

      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Books`, book)
    })

    test('updates a book by ID', async () => {
      axios.put = jest.fn()

      const bookId = 1
      const updatedBook = { id: 1, name: 'Updated Book' }
      await updateBook(bookId, updatedBook)

      expect(axios.put).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Books/${bookId}`, 
      { id: 1, name: 'Updated Book' })
    })

    test('delete a book by ID', async () => {
      axios.delete = jest.fn()

      const bookId = 1
      await deleteBook(bookId)

      expect(axios.delete).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Books/${bookId}`)
    })

    test('throws an error when fetching Books fails', async () => {
      axios.get = jest.fn().mockRejectedValue(new Error('Error fetching books:'))
  
      await expect(getBooks()).rejects.toThrow('Error fetching books:')
  
      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Books`)
    })
    
})


