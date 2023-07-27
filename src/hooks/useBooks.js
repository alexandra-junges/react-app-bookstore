import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    getBooks,
    searchBookWithCategory,
    deleteBook 
} from "../_services/book-service";

export const useBooks = () => {
    const navigate = useNavigate()
    const [booksList, setBooksList] = useState([])
    const [deleteAlert, setDeleteAlert] = useState(false)

    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const books = await getBooks()
            setBooksList(books)
          } catch (error) {
            console.error('Failed to fetch books.', error)
          }
        }
        fetchBooks()
      }, [])
      
    const onDelete = (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this book?'
        )
        if (confirmDelete) {
            deleteBook(id)
                .then(() => {
                    getBooks()
                        .then((books)=> {
                            setBooksList(books)
                        })
                    setDeleteAlert(true)
                    setTimeout(() => {
                        setDeleteAlert(false)
                    }, 1500)
                })
                .catch ((error) => {
                    console.error('Failed to delete the book.', error)
                    setDeleteAlert(true)
                    setTimeout(() => {
                        setDeleteAlert(false)
                    }, 1500)
            })
        }
    }
    
    const handleCreateBook = () => {
        navigate('/addeditbook')
    }
    
    const onEditButton = (id) => {
        navigate(`/addeditbook/${id}`)
    }
    
    const handleSearch = (searchedValue) => {
        if (searchedValue !== '') {
            searchBookWithCategory(searchedValue)
            .then((books) => {
                if(books.length > 0) {
                    setBooksList(books)
                } else {
                    setBooksList([])
                }
            })
            .catch((error) => {
                console.error("Error fetching books:", error)
                setBooksList([])
            })
        } else {
            getBooks()
                .then((books) => {
                    setBooksList(books)
                })
                .catch((error) => {
                    console.error("Error fetching books:", error)
                    setBooksList([])
                })
            }
    }

    return { 
        booksList,
        setBooksList,
        deleteAlert,
        setDeleteAlert,
        onDelete,
        handleCreateBook,
        handleSearch,
        onEditButton
    }
}
