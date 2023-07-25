import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getCategories } from "../_services/category-service";
import { 
    createBook, 
    updateBook, 
    getBookById 
} from "../_services/book-service";
import formatDate from '../utils/utilityDate'

export const useAddEditBooks = () => {
    const history = useNavigate()
    const { id } = useParams()
    const [categoryList, setCategoryList] = useState([])
    const [successAlert, setSuccessAlert] = useState(false)
    const [editAlert, setEditAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [book, setBook] = useState({
        id: 0,
        categoryId: 0,
        name: '',
        author: '',
        description: '',
        value: 0,
        publishDate: new Date(2023, 1, 1)
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categories = await getCategories()
                setCategoryList(categories)
            } catch (error) {
                console.error("An error occurred while getting the record.", error)
                setErrorAlert(true)
            }
        }
        fetchData()

        if (id) {
            getBookById(id)
                .then((book) => {
                    const selectedDate = new Date(book.publishDate)
                    const year = selectedDate.getFullYear()
                    let month = (selectedDate.getMonth() + 1).toString().padStart(2, '0')
                    let day = selectedDate.getDate().toString().padStart(2, '0')
                    const convertedDate = `${year}-${month}-${day}`
                    book.publishDate = convertedDate
                    setBook(book)
                })
                .catch((error) => {
                    console.error("Error fetching books:", error)
                })
        }
    }, [id])
    
    const onChange = (e) => {
        const { id, value } = e.target
        let newValue = value 
     
        if (id === 'categoryId' || id === 'value') {
            newValue = parseFloat(value)
        }

        if (id === 'publishDate') {
            newValue = formatDate(value)
        }

        setBook((prevState) => ({ 
            ...prevState, 
            [id]: newValue,
        }))
    }

    const resetForm = () => {
        setBook({ 
            id: '',
            categoryId: '',
            name: '',
            author: '',
            description: '',
            value: '',
            publishDate: '',
        })
    }

    const onSubmit = (e) => {
        if (!id) {
            onCreateForm(e)
        } else {
            onUpdateForm(e)
        }
      }

    const onCreateForm = (e) => {
        e.preventDefault()
        const bookData = {
            ...book,
            publishDate: formatDate(book.publishDate),
        }
        createBook(bookData)
            .then(()=> {
                resetForm()
                setSuccessAlert(true)
                setTimeout(() => {
                    setSuccessAlert(false)
                    onCancel()
                }, 1500)
            })
            .catch((error) => {
                console.error("Error creating book:", error)
                setErrorAlert(true)
            }
        )}

    const onUpdateForm = (e) => {
        e.preventDefault()
        updateBook(id, book)
            .then(()=> {
                setEditAlert(true)
                setTimeout(() => {
                    setEditAlert(false)
                    onCancel()
                }, 1500)
            })
            .catch((error) => {
                console.error("Error updating book:", error)
                setErrorAlert(true)
            }
    )}

    const isFormValid = !(
        book.name &&
        book.author &&
        book.description &&
        book.categoryId &&
        book.value &&
        book.publishDate
    )

    const onCancel = () => {
        history.push('/bookslist')
    }

    return {
        id,
        book,
        categoryList,
        successAlert,
        setSuccessAlert,
        editAlert,
        setEditAlert,
        errorAlert,
        setErrorAlert,
        onChange,
        onSubmit,
        isFormValid,
        onCancel
    }
}