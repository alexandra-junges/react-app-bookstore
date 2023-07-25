import axios from 'axios';

export const getBooks = async () => {
        try {
          const books = await axios.get(`${process.env.REACT_APP_API_URL}/api/Books`)
          return books.data
        } catch (error) {
          console.error("Error fetching books:", error)
          throw new Error("Failed to connect to the server. Please check your network connection.")
        }
}

export const getBookById = async (id) => {
        try {
            const book = await axios.get(`${process.env.REACT_APP_API_URL}/api/Books/${id}`)
            return book.data
        } catch (error) {
          console.error("Error fetching book:", error)
          throw new Error("Failed to connect to the server. Please check your network connection.")
        }
}

  export const getBookByCategoryId = async (id) => {
      try {
          const book = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/Books/get-books-by-category/${id}`
          )
          return book.data
      } catch (error) {
        if(error.response && error.response.status !== 404) {
          console.error("Error fetching book:", error)
          return false
        }
      }
    }

  export const searchBookWithCategory = async (searchedValue) => {
      const books = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/Books/search-book-with-category/${searchedValue}`
      )
      return books.data
    }

  export const createBook = async (bookData) => {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/Books`, bookData)
    }

  export const updateBook = async (id, book) => {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/Books/${id}`, book)
    }

  export const deleteBook = async (id) => {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/Books/${id}`)
    }